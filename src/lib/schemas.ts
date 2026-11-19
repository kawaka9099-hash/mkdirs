import * as z from "zod";
import { dictionaries, translate } from "@/i18n/dictionaries";
import { SUPPORT_ITEM_ICON } from "./constants";

/**
 * Validation messages are translated through the same 8-language
 * dictionaries as the rest of the UI. Client forms build their schema
 * with the current locale via createXxxSchema(t); server actions keep
 * using the static schemas below, which default to the Chinese messages.
 */
export type TFunction = (
  key: string,
  vars?: Record<string, string | number>,
) => string;

const zhT: TFunction = (key, vars) => translate(dictionaries.zh, key, vars);

/**
 * newsletter schema
 */
export const createNewsletterFormSchema = (t: TFunction) =>
  z.object({
    email: z.string().email({
      message: t("validation.validEmail"),
    }),
  });

export const NewsletterFormSchema = createNewsletterFormSchema(zhT);

export type NewsletterFormData = z.infer<typeof NewsletterFormSchema>;

/**
 * submit item
 */
export const createBaseSubmitSchema = (t: TFunction) => ({
  name: z
    .string()
    .min(1, { message: t("validation.nameRequired") })
    .max(32, { message: t("validation.nameMax32") }),
  link: z.string().url({ message: t("validation.invalidUrl") }),
  description: z
    .string()
    .min(1, { message: t("validation.descriptionRequired") })
    .max(256, { message: t("validation.descriptionMax256") }),
  introduction: z
    .string()
    .min(1, { message: t("validation.introductionRequired") })
    .max(4096, {
      message: t("validation.introductionMax4096"),
    }),
  tags: z
    .array(z.string())
    .min(1, { message: t("validation.tagRequired") }),
  categories: z
    .array(z.string())
    .min(1, { message: t("validation.categoryRequired") }),
  imageId: z.string().min(1, { message: t("validation.imageRequired") }),
});

export const baseSubmitSchema = createBaseSubmitSchema(zhT);

export const createSubmitSchema = (t: TFunction) =>
  SUPPORT_ITEM_ICON
    ? z.object({
        ...createBaseSubmitSchema(t),
        iconId: z.string().min(1, { message: t("validation.iconRequired") }),
      })
    : z.object(createBaseSubmitSchema(t));

export const SubmitSchema = createSubmitSchema(zhT);

/**
 * edit item
 */
export const createEditSchema = (t: TFunction) =>
  createSubmitSchema(t).extend({
    id: z.string().min(1, { message: t("validation.idRequired") }),
    pricePlan: z
      .string()
      .min(1, { message: t("validation.pricePlanRequired") }),
    planStatus: z
      .string()
      .min(1, { message: t("validation.planStatusRequired") }),
  });

export const EditSchema = createEditSchema(zhT);

/**
 * account settings
 */
export const createSettingsSchema = (t: TFunction) =>
  z
    .object({
      name: z.string().min(1, { message: t("validation.nameRequired") }),
      link: z.string().optional(),
      password: z.optional(z.string().min(6)),
      newPassword: z.optional(z.string().min(6)),
    })
    .refine(
      (data) => {
        if (data.password && !data.newPassword) {
          return false;
        }

        return true;
      },
      {
        message: t("validation.newPasswordRequired"),
        path: ["newPassword"],
      },
    )
    .refine(
      (data) => {
        if (data.newPassword && !data.password) {
          return false;
        }

        return true;
      },
      {
        message: t("validation.passwordRequired"),
        path: ["password"],
      },
    );

export const SettingsSchema = createSettingsSchema(zhT);

export const createUserNameSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .min(1, { message: t("validation.nameRequired") })
      .max(32, { message: t("validation.nameMax32") }),
  });

export const UserNameSchema = createUserNameSchema(zhT);

export type UserNameData = z.infer<typeof UserNameSchema>;

export const createUserLinkSchema = (t: TFunction) =>
  z.object({
    link: z
      .string()
      .min(0, { message: t("validation.linkOptional") })
      .max(128, { message: t("validation.linkMax128") }),
  });

export const UserLinkSchema = createUserLinkSchema(zhT);

export type UserLinkData = z.infer<typeof UserLinkSchema>;

export const createUserPasswordSchema = (t: TFunction) =>
  z
    .object({
      password: z.string().min(6, {
        message: t("validation.min6Chars"),
      }),
      newPassword: z.string().min(6, {
        message: t("validation.min6Chars"),
      }),
      confirmPassword: z.string().min(6, {
        message: t("validation.min6Chars"),
      }),
    })
    .refine(
      (data) => {
        if (data.newPassword && !data.password) {
          return false;
        }

        return true;
      },
      {
        message: t("validation.passwordRequired"),
        path: ["password"],
      },
    )
    .refine(
      (data) => {
        if (data.password && !data.newPassword) {
          return false;
        }

        return true;
      },
      {
        message: t("validation.newPasswordRequired"),
        path: ["newPassword"],
      },
    )
    .refine(
      (data) => {
        if (data.newPassword !== data.confirmPassword) {
          return false;
        }

        return true;
      },
      {
        message: t("validation.passwordsMismatch"),
        path: ["confirmPassword"],
      },
    );

export const UserPasswordSchema = createUserPasswordSchema(zhT);

export type UserPasswordData = z.infer<typeof UserPasswordSchema>;

/**
 * auth related schemas
 */
export const createNewPasswordSchema = (t: TFunction) =>
  z.object({
    password: z.string().min(6, {
      message: t("validation.min6Chars"),
    }),
  });

export const NewPasswordSchema = createNewPasswordSchema(zhT);

export const createResetSchema = (t: TFunction) =>
  z.object({
    email: z.string().email({
      message: t("validation.emailRequired"),
    }),
  });

export const ResetSchema = createResetSchema(zhT);

export const createLoginSchema = (t: TFunction) =>
  z.object({
    email: z.string().email({
      message: t("validation.emailRequired"),
    }),
    password: z.string().min(1, {
      message: t("validation.passwordRequired"),
    }),
  });

export const LoginSchema = createLoginSchema(zhT);

export const createRegisterSchema = (t: TFunction) =>
  z.object({
    email: z.string().email({
      message: t("validation.emailRequired"),
    }),
    password: z.string().min(6, {
      message: t("validation.min6Chars"),
    }),
    name: z.string().min(1, {
      message: t("validation.nameRequired"),
    }),
  });

export const RegisterSchema = createRegisterSchema(zhT);

/**
 * og image schema
 */
export const ogImageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  type: z.string().optional(),
  mode: z.enum(["light", "dark"]).default("light"),
});
