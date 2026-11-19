"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import { PricePlans } from "@/lib/submission";
import { cn } from "@/lib/utils";
import type { ItemInfo, PricePlan } from "@/types";
import { RocketIcon } from "lucide-react";

interface XiaodouPayButtonProps {
  item: ItemInfo;
  pricePlan: PricePlan;
  className?: string;
}

type PayState = "idle" | "creating" | "waiting";

/** 小豆支付按钮：选微信/支付宝 → 下单拿付款码 → 扫码后轮询到账自动跳发布页。 */
export function XiaodouPayButton({
  item,
  pricePlan,
  className,
}: XiaodouPayButtonProps) {
  const router = useRouter();
  const [payType, setPayType] = useState<"wxpay" | "alipay">("wxpay");
  const [state, setState] = useState<PayState>("idle");
  const [qrcode, setQrcode] = useState("");
  const [qrBroken, setQrBroken] = useState(false);
  const [error, setError] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const checkedOnMount = useRef(false);

  const plan =
    pricePlan.title.toLowerCase() === PricePlans.SPONSOR
      ? PricePlans.SPONSOR
      : PricePlans.PRO;

  const checkPaid = async (t: "wxpay" | "alipay") => {
    try {
      const s = await fetch(
        `/api/pay/xiaodou/status?itemId=${item._id}&plan=${plan}&type=${t}`,
        { cache: "no-store" },
      );
      if (!s.ok) return false;
      const sd = (await s.json()) as { paid?: boolean };
      return sd?.paid === true;
    } catch {
      return false;
    }
  };

  // 进页先查一次到账：回调丢了、或已在别处付过款时，打开页就能发现并跳发布页。
  // 两种渠道都试（回跳回来时默认选中的不一定是付款用的那个）。
  useEffect(() => {
    if (checkedOnMount.current) return;
    checkedOnMount.current = true;
    (async () => {
      if (await checkPaid(payType)) {
        router.push(`/publish/${item._id}?pay=success`);
        return;
      }
      const other = payType === "wxpay" ? "alipay" : "wxpay";
      if (await checkPaid(other)) {
        router.push(`/publish/${item._id}?pay=success`);
      }
    })();
    // 只在挂载时查一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => stopPolling, []);

  const startPay = async () => {
    setError("");
    setState("creating");
    try {
      const res = await fetch("/api/pay/xiaodou/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item._id, plan, type: payType }),
      });
      const data = (await res.json()) as {
        qrcode?: string;
        alreadyPaid?: boolean;
        error?: string;
      };
      if (!res.ok) {
        setError(data?.error ?? "创建支付订单失败");
        setState("idle");
        return;
      }
      if (data?.alreadyPaid) {
        router.push(`/publish/${item._id}?pay=success`);
        return;
      }
      if (!data?.qrcode) {
        setError("未拿到付款码，请稍后再试");
        setState("idle");
        return;
      }
      setQrcode(data.qrcode);
      setQrBroken(false);
      setState("waiting");
      pollRef.current = setInterval(async () => {
        try {
          const s = await fetch(
            `/api/pay/xiaodou/status?itemId=${item._id}&plan=${plan}&type=${payType}`,
            { cache: "no-store" },
          );
          const sd = (await s.json()) as { paid?: boolean };
          if (sd?.paid) {
            stopPolling();
            router.push(`/publish/${item._id}?pay=success`);
          }
        } catch {
          // 下次再查
        }
      }, 3000);
      // 收银台订单 30 分钟有效，轮询跟它对齐（之前 5 分钟就停，付得晚就查不到）
      timeoutRef.current = setTimeout(() => {
        stopPolling();
        setError("付款码已过期，请重新下单");
        setState("idle");
      }, 30 * 60 * 1000);
    } catch {
      setError("网络异常，请稍后再试");
      setState("idle");
    }
  };

  if (state === "waiting") {
    const isAppLink =
      qrcode.startsWith("weixin://") || qrcode.startsWith("alipays://");
    // 网关有时给的不是二维码图片，而是收银台页面地址——当图片渲染就是破图。
    const isImageUrl =
      qrcode.startsWith("data:image/") ||
      /\.(png|jpe?g|gif|webp|svg)(\?|#|$)/i.test(qrcode);
    const isPageUrl = !isAppLink && !isImageUrl;
    return (
      <div className="flex flex-col items-center gap-3">
        {isAppLink ? (
          <a
            href={qrcode}
            className="text-primary underline underline-offset-4"
          >
            打开{payType === "wxpay" ? "微信" : "支付宝"}支付
          </a>
        ) : isPageUrl || qrBroken ? (
          <a
            href={qrcode}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            前往收银台扫码支付
          </a>
        ) : (
          <Image
            src={qrcode}
            alt="扫码支付"
            width={200}
            height={200}
            unoptimized
            onError={() => setQrBroken(true)}
          />
        )}
        <p className="text-sm text-muted-foreground">
          请用{payType === "wxpay" ? "微信" : "支付宝"}
          扫码支付，支付成功后自动跳转
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            stopPolling();
            setState("idle");
          }}
        >
          取消
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 justify-center">
        <Button
          variant={payType === "wxpay" ? "default" : "outline"}
          size="sm"
          onClick={() => setPayType("wxpay")}
        >
          微信支付
        </Button>
        <Button
          variant={payType === "alipay" ? "default" : "outline"}
          size="sm"
          onClick={() => setPayType("alipay")}
        >
          支付宝
        </Button>
      </div>
      <Button
        size="lg"
        variant="default"
        className={cn(
          "overflow-hidden rounded-full",
          "group transition-transform duration-300 ease-in-out hover:scale-105",
          "bg-primary text-primary-foreground dark:bg-primary/90",
          "hover:bg-primary/90 dark:hover:bg-primary/80",
          "shadow-lg hover:shadow-xl",
          className,
        )}
        disabled={state === "creating"}
        onClick={startPay}
      >
        {state === "creating" ? (
          <div className="flex items-center justify-center">
            <Icons.spinner className="mr-2 size-4 animate-spin" />
            <span>正在创建订单...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <RocketIcon className="mr-2 size-4 icon-scale" />
            <span>支付 ¥{pricePlan.price} 并立即发布</span>
          </div>
        )}
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
