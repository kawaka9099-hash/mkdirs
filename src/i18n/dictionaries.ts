// UI copy for the public site in 8 languages. This covers the interface
// chrome only — directory content (item names, descriptions, category names)
// comes from Sanity and stays in its original language.
// Placeholders: {n} for counts, {date} for dates.

import type { Locale } from "./config";

export type Dictionary = {
  nav: {
    signIn: string;
    language: string;
    home: string;
    home2: string;
    home3: string;
    search: string;
    collection: string;
    category: string;
    tag: string;
    blog: string;
    pricing: string;
    submit: string;
    studio: string;
    dashboard: string;
    settings: string;
    logout: string;
  };
  hero: {
    titleFirst: string;
    titleSecond: string;
    subtitle: string;
    cta: string;
    items: string;
    categories: string;
    updatedToday: string;
    updatedWeek: string;
    updatedMonth: string;
    updatedOn: string;
    collecting: string;
    collectingCta: string;
  };
  home: {
    latest: string;
    hot: string;
    categories: string;
    picks: string;
    posts: string;
    viewAllItems: string;
    viewAllCategories: string;
    viewAllPosts: string;
    countItems: string;
    noItems: string;
  };
  search: {
    placeholder: string;
    allCategories: string;
    selectTags: string;
    reset: string;
    sortTimeDesc: string;
    sortTimeAsc: string;
    sortNameDesc: string;
    sortNameAsc: string;
    noFilter: string;
    featured: string;
    noResults: string;
    noResultsFound: string;
    search: string;
  };
  item: {
    visitWebsite: string;
    details: string;
    featured: string;
    sponsored: string;
    introduction: string;
    information: string;
    publisher: string;
    website: string;
    publishedDate: string;
    categories: string;
    tags: string;
    moreProducts: string;
  };
  footer: {
    tagline: string;
    product: string;
    resources: string;
    pages: string;
    company: string;
    search: string;
    collection: string;
    category: string;
    tag: string;
    blog: string;
    pricing: string;
    submit: string;
    studio: string;
    home2: string;
    home3: string;
    collection1: string;
    collection2: string;
    about: string;
    privacy: string;
    terms: string;
    sitemap: string;
    copyright: string;
  };
  auth: {
    welcomeBack: string;
    createAccount: string;
    noAccount: string;
    hasAccount: string;
    email: string;
    password: string;
    name: string;
    forgotPassword: string;
    login: string;
    createAccountBtn: string;
    loginGoogle: string;
    loginGithub: string;
    somethingWrong: string;
    emailInUse: string;
  };
  common: {
    back: string;
  };
  misc: {
    backHome: string;
    backLogin: string;
    oops: string;
    sendResetEmail: string;
    resetPasswordTitle: string;
    forgotPasswordTitle: string;
    confirmingVerification: string;
    missingToken: string;
    blogSubtitle: string;
    category: string;
    collection: string;
    blog: string;
    tryAgain: string;
    tryAgainBtn: string;
    exploreCollections: string;
  };
  pricing: {
    label: string;
    title: string;
    faqTitle: string;
  };
};

const zh: Dictionary = {
  nav: {
    signIn: "登录",
    language: "语言",
    home: "首页",
    home2: "首页 2",
    home3: "首页 3",
    search: "搜索",
    collection: "合集",
    category: "分类",
    tag: "标签",
    blog: "博客",
    pricing: "定价",
    submit: "提交",
    studio: "管理后台",
    dashboard: "控制台",
    settings: "设置",
    logout: "退出登录",
  },
  hero: {
    titleFirst: "发现国内",
    titleSecond: "优质一人公司",
    subtitle: "CN OPC 收录国内优质一人公司、独立开发者与自由职业者",
    cta: "收录你的公司",
    items: "收录",
    categories: "分类",
    updatedToday: "今日已更新",
    updatedWeek: "本周已更新",
    updatedMonth: "本月已更新",
    updatedOn: "最近更新于 {date}",
    collecting: "持续收集中",
    collectingCta: "持续收集中，欢迎提交你的一人公司",
  },
  home: {
    latest: "最新收录",
    hot: "最热收录",
    categories: "分类浏览",
    picks: "编辑精选",
    posts: "最新文章",
    viewAllItems: "查看全部收录",
    viewAllCategories: "全部分类",
    viewAllPosts: "全部文章",
    countItems: "{n} 家收录",
    noItems: "暂未收录",
  },
  search: {
    placeholder: "搜索你需要的一人公司",
    allCategories: "全部分类",
    selectTags: "选择标签",
    reset: "重置",
    sortTimeDesc: "按时间倒序",
    sortTimeAsc: "按时间正序",
    sortNameDesc: "按名称倒序",
    sortNameAsc: "按名称正序",
    noFilter: "不过滤",
    featured: "精选",
    noResults: "没有找到相关内容。",
    noResultsFound: "没有找到相关结果。",
    search: "搜索",
  },
  item: {
    visitWebsite: "访问网站",
    details: "详情",
    featured: "精选",
    sponsored: "赞助",
    introduction: "介绍",
    information: "信息",
    publisher: "发布者",
    website: "网站",
    publishedDate: "发布日期",
    categories: "分类",
    tags: "标签",
    moreProducts: "更多产品",
  },
  footer: {
    tagline: "收录国内优质一人公司",
    product: "产品",
    resources: "资源",
    pages: "页面",
    company: "公司",
    search: "搜索",
    collection: "合集",
    category: "分类",
    tag: "标签",
    blog: "博客",
    pricing: "定价",
    submit: "提交",
    studio: "管理后台",
    home2: "首页 2",
    home3: "首页 3",
    collection1: "合集 1",
    collection2: "合集 2",
    about: "关于我们",
    privacy: "隐私政策",
    terms: "服务条款",
    sitemap: "网站地图",
    copyright: "版权所有，保留所有权利。",
  },
  auth: {
    welcomeBack: "欢迎回来",
    createAccount: "创建账号",
    noAccount: "还没有账号？注册",
    hasAccount: "已有账号？登录",
    email: "邮箱",
    password: "密码",
    name: "名字",
    forgotPassword: "忘记密码？",
    login: "登录",
    createAccountBtn: "创建账号",
    loginGoogle: "用 Google 登录",
    loginGithub: "用 GitHub 登录",
    somethingWrong: "出了点问题",
    emailInUse: "该邮箱已用其他方式注册！",
  },
  common: {
    back: "返回",
  },
  misc: {
    backHome: "回到首页",
    backLogin: "回到登录",
    oops: "哎呀，出错了！",
    sendResetEmail: "发送重置邮件",
    resetPasswordTitle: "重置密码",
    forgotPasswordTitle: "忘记密码？",
    confirmingVerification: "正在确认验证",
    missingToken: "缺少验证令牌！",
    blogSubtitle: "阅读我们的最新文章",
    category: "分类",
    collection: "合集",
    blog: "博客",
    tryAgain: "请重试。",
    tryAgainBtn: "重试",
    exploreCollections: "按合集浏览",
  },
  pricing: {
    label: "定价",
    title: "选择适合你的套餐",
    faqTitle: "常见问题",
  },
};

const en: Dictionary = {
  nav: {
    signIn: "Sign In",
    language: "Language",
    home: "Home",
    home2: "Home 2",
    home3: "Home 3",
    search: "Search",
    collection: "Collections",
    category: "Categories",
    tag: "Tags",
    blog: "Blog",
    pricing: "Pricing",
    submit: "Submit",
    studio: "Studio",
    dashboard: "Dashboard",
    settings: "Settings",
    logout: "Log out",
  },
  hero: {
    titleFirst: "Discover great",
    titleSecond: "one-person companies",
    subtitle:
      "CN OPC lists quality one-person companies, indie developers and freelancers in China",
    cta: "List your company",
    items: "listings",
    categories: "categories",
    updatedToday: "Updated today",
    updatedWeek: "Updated this week",
    updatedMonth: "Updated this month",
    updatedOn: "Last updated {date}",
    collecting: "Collecting",
    collectingCta: "Still collecting — submit your one-person company",
  },
  home: {
    latest: "Latest listings",
    hot: "Trending",
    categories: "Browse categories",
    picks: "Editor's picks",
    posts: "Latest posts",
    viewAllItems: "View all listings",
    viewAllCategories: "All categories",
    viewAllPosts: "All posts",
    countItems: "{n} listings",
    noItems: "No listings yet",
  },
  search: {
    placeholder: "Search one-person companies",
    allCategories: "All categories",
    selectTags: "Select tags",
    reset: "Reset",
    sortTimeDesc: "Newest first",
    sortTimeAsc: "Oldest first",
    sortNameDesc: "Name Z–A",
    sortNameAsc: "Name A–Z",
    noFilter: "No filter",
    featured: "Featured",
    noResults: "Nothing found.",
    noResultsFound: "No results found.",
    search: "Search",
  },
  item: {
    visitWebsite: "Visit Website",
    details: "Details",
    featured: "Featured",
    sponsored: "Sponsored",
    introduction: "Introduction",
    information: "Information",
    publisher: "Publisher",
    website: "Website",
    publishedDate: "Published date",
    categories: "Categories",
    tags: "Tags",
    moreProducts: "More products",
  },
  footer: {
    tagline: "Listing quality one-person companies in China",
    product: "Product",
    resources: "Resources",
    pages: "Pages",
    company: "Company",
    search: "Search",
    collection: "Collections",
    category: "Categories",
    tag: "Tags",
    blog: "Blog",
    pricing: "Pricing",
    submit: "Submit",
    studio: "Studio",
    home2: "Home 2",
    home3: "Home 3",
    collection1: "Collection 1",
    collection2: "Collection 2",
    about: "About Us",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    sitemap: "Sitemap",
    copyright: "All Rights Reserved.",
  },
  auth: {
    welcomeBack: "Welcome back",
    createAccount: "Create an account",
    noAccount: "Don't have an account? Sign up",
    hasAccount: "Already have an account? Sign in",
    email: "Email",
    password: "Password",
    name: "Name",
    forgotPassword: "Forgot password?",
    login: "Login",
    createAccountBtn: "Create an account",
    loginGoogle: "Login with Google",
    loginGithub: "Login with GitHub",
    somethingWrong: "Something went wrong",
    emailInUse: "Email already in use with different provider!",
  },
  common: {
    back: "Back",
  },
  misc: {
    backHome: "Back to home",
    backLogin: "Back to login",
    oops: "Oops! Something went wrong!",
    sendResetEmail: "Send reset email",
    resetPasswordTitle: "Reset password",
    forgotPasswordTitle: "Forgot password?",
    confirmingVerification: "Confirming your verification",
    missingToken: "Missing token!",
    blogSubtitle: "Read our latest blog posts",
    category: "Category",
    collection: "Collection",
    blog: "Blog",
    tryAgain: "Please try again.",
    tryAgainBtn: "Try again",
    exploreCollections: "Explore by collections",
  },
  pricing: {
    label: "Pricing",
    title: "Choose a pricing plan",
    faqTitle: "Frequently Asked Questions",
  },
};

const ja: Dictionary = {
  nav: {
    signIn: "ログイン",
    language: "言語",
    home: "ホーム",
    home2: "ホーム 2",
    home3: "ホーム 3",
    search: "検索",
    collection: "コレクション",
    category: "カテゴリー",
    tag: "タグ",
    blog: "ブログ",
    pricing: "料金",
    submit: "登録する",
    studio: "管理画面",
    dashboard: "ダッシュボード",
    settings: "設定",
    logout: "ログアウト",
  },
  hero: {
    titleFirst: "中国の優れた",
    titleSecond: "一人会社を発見",
    subtitle:
      "CN OPC は中国の優れた一人会社、個人開発者、フリーランサーを収録しています",
    cta: "あなたの会社を登録",
    items: "件の収録",
    categories: "カテゴリー",
    updatedToday: "今日更新",
    updatedWeek: "今週更新",
    updatedMonth: "今月更新",
    updatedOn: "最終更新 {date}",
    collecting: "収集中",
    collectingCta: "収集中です。あなたの一人会社をぜひご登録ください",
  },
  home: {
    latest: "最新の収録",
    hot: "人気の収録",
    categories: "カテゴリーから探す",
    picks: "編集部のおすすめ",
    posts: "最新の記事",
    viewAllItems: "すべての収録を見る",
    viewAllCategories: "すべてのカテゴリー",
    viewAllPosts: "すべての記事",
    countItems: "{n} 件の収録",
    noItems: "まだ収録がありません",
  },
  search: {
    placeholder: "一人会社を検索",
    allCategories: "すべてのカテゴリー",
    selectTags: "タグを選択",
    reset: "リセット",
    sortTimeDesc: "新しい順",
    sortTimeAsc: "古い順",
    sortNameDesc: "名前 降順",
    sortNameAsc: "名前 昇順",
    noFilter: "フィルターなし",
    featured: "注目",
    noResults: "見つかりませんでした。",
    noResultsFound: "結果が見つかりませんでした。",
    search: "検索",
  },
  item: {
    visitWebsite: "サイトを見る",
    details: "詳細",
    featured: "注目",
    sponsored: "スポンサー",
    introduction: "紹介",
    information: "情報",
    publisher: "投稿者",
    website: "ウェブサイト",
    publishedDate: "公開日",
    categories: "カテゴリー",
    tags: "タグ",
    moreProducts: "関連するプロダクト",
  },
  footer: {
    tagline: "中国の優れた一人会社を収録",
    product: "プロダクト",
    resources: "リソース",
    pages: "ページ",
    company: "会社",
    search: "検索",
    collection: "コレクション",
    category: "カテゴリー",
    tag: "タグ",
    blog: "ブログ",
    pricing: "料金",
    submit: "登録する",
    studio: "管理画面",
    home2: "ホーム 2",
    home3: "ホーム 3",
    collection1: "コレクション 1",
    collection2: "コレクション 2",
    about: "会社概要",
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    sitemap: "サイトマップ",
    copyright: "All Rights Reserved.",
  },
  auth: {
    welcomeBack: "おかえりなさい",
    createAccount: "アカウントを作成",
    noAccount: "アカウントをお持ちでない方：登録",
    hasAccount: "すでにアカウントをお持ちの方：ログイン",
    email: "メールアドレス",
    password: "パスワード",
    name: "名前",
    forgotPassword: "パスワードをお忘れですか？",
    login: "ログイン",
    createAccountBtn: "アカウントを作成",
    loginGoogle: "Google でログイン",
    loginGithub: "GitHub でログイン",
    somethingWrong: "問題が発生しました",
    emailInUse: "このメールアドレスは他の方法で既に登録されています！",
  },
  common: {
    back: "戻る",
  },
  misc: {
    backHome: "ホームに戻る",
    backLogin: "ログインに戻る",
    oops: "おっと！問題が発生しました！",
    sendResetEmail: "リセットメールを送信",
    resetPasswordTitle: "パスワードをリセット",
    forgotPasswordTitle: "パスワードをお忘れですか？",
    confirmingVerification: "確認中",
    missingToken: "トークンがありません！",
    blogSubtitle: "最新のブログ記事を読む",
    category: "カテゴリー",
    collection: "コレクション",
    blog: "ブログ",
    tryAgain: "もう一度お試しください。",
    tryAgainBtn: "再試行",
    exploreCollections: "コレクションから探す",
  },
  pricing: {
    label: "料金",
    title: "プランを選択",
    faqTitle: "よくある質問",
  },
};

const ko: Dictionary = {
  nav: {
    signIn: "로그인",
    language: "언어",
    home: "홈",
    home2: "홈 2",
    home3: "홈 3",
    search: "검색",
    collection: "컬렉션",
    category: "카테고리",
    tag: "태그",
    blog: "블로그",
    pricing: "요금",
    submit: "등록하기",
    studio: "스튜디오",
    dashboard: "대시보드",
    settings: "설정",
    logout: "로그아웃",
  },
  hero: {
    titleFirst: "중국의 우수한",
    titleSecond: "1인 기업을 발견하세요",
    subtitle: "CN OPC는 중국의 우수한 1인 기업, 인디 개발자, 프리랜서를 소개합니다",
    cta: "내 회사 등록하기",
    items: "개의 등록",
    categories: "카테고리",
    updatedToday: "오늘 업데이트됨",
    updatedWeek: "이번 주 업데이트됨",
    updatedMonth: "이번 달 업데이트됨",
    updatedOn: "마지막 업데이트 {date}",
    collecting: "수집 중",
    collectingCta: "수집 중입니다. 당신의 1인 기업을 등록해 주세요",
  },
  home: {
    latest: "최신 등록",
    hot: "인기 등록",
    categories: "카테고리 탐색",
    picks: "에디터 추천",
    posts: "최신 글",
    viewAllItems: "모든 등록 보기",
    viewAllCategories: "모든 카테고리",
    viewAllPosts: "모든 글",
    countItems: "{n}개의 등록",
    noItems: "아직 등록이 없습니다",
  },
  search: {
    placeholder: "1인 기업 검색",
    allCategories: "모든 카테고리",
    selectTags: "태그 선택",
    reset: "초기화",
    sortTimeDesc: "최신순",
    sortTimeAsc: "오래된순",
    sortNameDesc: "이름 내림차순",
    sortNameAsc: "이름 오름차순",
    noFilter: "필터 없음",
    featured: "추천",
    noResults: "찾은 내용이 없습니다.",
    noResultsFound: "검색 결과가 없습니다.",
    search: "검색",
  },
  item: {
    visitWebsite: "웹사이트 방문",
    details: "자세히",
    featured: "추천",
    sponsored: "스폰서",
    introduction: "소개",
    information: "정보",
    publisher: "게시자",
    website: "웹사이트",
    publishedDate: "게시일",
    categories: "카테고리",
    tags: "태그",
    moreProducts: "관련 제품",
  },
  footer: {
    tagline: "중국의 우수한 1인 기업을 소개합니다",
    product: "제품",
    resources: "리소스",
    pages: "페이지",
    company: "회사",
    search: "검색",
    collection: "컬렉션",
    category: "카테고리",
    tag: "태그",
    blog: "블로그",
    pricing: "요금",
    submit: "등록하기",
    studio: "스튜디오",
    home2: "홈 2",
    home3: "홈 3",
    collection1: "컬렉션 1",
    collection2: "컬렉션 2",
    about: "회사 소개",
    privacy: "개인정보처리방침",
    terms: "이용약관",
    sitemap: "사이트맵",
    copyright: "All Rights Reserved.",
  },
  auth: {
    welcomeBack: "다시 오신 것을 환영합니다",
    createAccount: "계정 만들기",
    noAccount: "계정이 없으신가요? 가입하기",
    hasAccount: "이미 계정이 있으신가요? 로그인",
    email: "이메일",
    password: "비밀번호",
    name: "이름",
    forgotPassword: "비밀번호를 잊으셨나요?",
    login: "로그인",
    createAccountBtn: "계정 만들기",
    loginGoogle: "Google로 로그인",
    loginGithub: "GitHub으로 로그인",
    somethingWrong: "문제가 발생했습니다",
    emailInUse: "이 이메일은 이미 다른 방법으로 등록되어 있습니다!",
  },
  common: {
    back: "뒤로",
  },
  misc: {
    backHome: "홈으로 돌아가기",
    backLogin: "로그인으로 돌아가기",
    oops: "이런! 문제가 발생했습니다!",
    sendResetEmail: "재설정 이메일 보내기",
    resetPasswordTitle: "비밀번호 재설정",
    forgotPasswordTitle: "비밀번호를 잊으셨나요?",
    confirmingVerification: "확인 중",
    missingToken: "토큰이 없습니다!",
    blogSubtitle: "최신 블로그 글 읽기",
    category: "카테고리",
    collection: "컬렉션",
    blog: "블로그",
    tryAgain: "다시 시도해 주세요.",
    tryAgainBtn: "다시 시도",
    exploreCollections: "컬렉션으로 탐색",
  },
  pricing: {
    label: "요금",
    title: "요금제를 선택하세요",
    faqTitle: "자주 묻는 질문",
  },
};

const fr: Dictionary = {
  nav: {
    signIn: "Se connecter",
    language: "Langue",
    home: "Accueil",
    home2: "Accueil 2",
    home3: "Accueil 3",
    search: "Rechercher",
    collection: "Collections",
    category: "Catégories",
    tag: "Tags",
    blog: "Blog",
    pricing: "Tarifs",
    submit: "Proposer",
    studio: "Studio",
    dashboard: "Tableau de bord",
    settings: "Paramètres",
    logout: "Se déconnecter",
  },
  hero: {
    titleFirst: "Découvrez les meilleures",
    titleSecond: "entreprises individuelles en Chine",
    subtitle:
      "CN OPC recense les meilleures entreprises individuelles, développeurs indépendants et freelances en Chine",
    cta: "Référencer votre entreprise",
    items: "références",
    categories: "catégories",
    updatedToday: "Mis à jour aujourd'hui",
    updatedWeek: "Mis à jour cette semaine",
    updatedMonth: "Mis à jour ce mois-ci",
    updatedOn: "Dernière mise à jour : {date}",
    collecting: "Collecte en cours",
    collectingCta: "Collecte en cours — proposez votre entreprise individuelle",
  },
  home: {
    latest: "Derniers ajouts",
    hot: "Tendances",
    categories: "Parcourir les catégories",
    picks: "Sélection de la rédaction",
    posts: "Derniers articles",
    viewAllItems: "Voir toutes les références",
    viewAllCategories: "Toutes les catégories",
    viewAllPosts: "Tous les articles",
    countItems: "{n} références",
    noItems: "Aucune référence pour le moment",
  },
  search: {
    placeholder: "Rechercher une entreprise individuelle",
    allCategories: "Toutes les catégories",
    selectTags: "Choisir des tags",
    reset: "Réinitialiser",
    sortTimeDesc: "Plus récents",
    sortTimeAsc: "Plus anciens",
    sortNameDesc: "Nom Z–A",
    sortNameAsc: "Nom A–Z",
    noFilter: "Aucun filtre",
    featured: "À la une",
    noResults: "Aucun résultat.",
    noResultsFound: "Aucun résultat trouvé.",
    search: "Rechercher",
  },
  item: {
    visitWebsite: "Visiter le site",
    details: "Détails",
    featured: "À la une",
    sponsored: "Sponsorisé",
    introduction: "Présentation",
    information: "Informations",
    publisher: "Publié par",
    website: "Site web",
    publishedDate: "Date de publication",
    categories: "Catégories",
    tags: "Tags",
    moreProducts: "Plus de produits",
  },
  footer: {
    tagline: "Les meilleures entreprises individuelles en Chine",
    product: "Produit",
    resources: "Ressources",
    pages: "Pages",
    company: "Entreprise",
    search: "Rechercher",
    collection: "Collections",
    category: "Catégories",
    tag: "Tags",
    blog: "Blog",
    pricing: "Tarifs",
    submit: "Proposer",
    studio: "Studio",
    home2: "Accueil 2",
    home3: "Accueil 3",
    collection1: "Collection 1",
    collection2: "Collection 2",
    about: "À propos",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    sitemap: "Plan du site",
    copyright: "Tous droits réservés.",
  },
  auth: {
    welcomeBack: "Bon retour",
    createAccount: "Créer un compte",
    noAccount: "Pas encore de compte ? S'inscrire",
    hasAccount: "Déjà un compte ? Se connecter",
    email: "E-mail",
    password: "Mot de passe",
    name: "Nom",
    forgotPassword: "Mot de passe oublié ?",
    login: "Connexion",
    createAccountBtn: "Créer un compte",
    loginGoogle: "Se connecter avec Google",
    loginGithub: "Se connecter avec GitHub",
    somethingWrong: "Un problème est survenu",
    emailInUse: "Cet e-mail est déjà utilisé avec un autre fournisseur !",
  },
  common: {
    back: "Retour",
  },
  misc: {
    backHome: "Retour à l'accueil",
    backLogin: "Retour à la connexion",
    oops: "Oups ! Un problème est survenu !",
    sendResetEmail: "Envoyer l'e-mail de réinitialisation",
    resetPasswordTitle: "Réinitialiser le mot de passe",
    forgotPasswordTitle: "Mot de passe oublié ?",
    confirmingVerification: "Confirmation de votre vérification",
    missingToken: "Jeton manquant !",
    blogSubtitle: "Lisez nos derniers articles",
    category: "Catégorie",
    collection: "Collection",
    blog: "Blog",
    tryAgain: "Veuillez réessayer.",
    tryAgainBtn: "Réessayer",
    exploreCollections: "Explorer les collections",
  },
  pricing: {
    label: "Tarifs",
    title: "Choisissez votre offre",
    faqTitle: "Questions fréquentes",
  },
};

const es: Dictionary = {
  nav: {
    signIn: "Iniciar sesión",
    language: "Idioma",
    home: "Inicio",
    home2: "Inicio 2",
    home3: "Inicio 3",
    search: "Buscar",
    collection: "Colecciones",
    category: "Categorías",
    tag: "Etiquetas",
    blog: "Blog",
    pricing: "Precios",
    submit: "Enviar",
    studio: "Studio",
    dashboard: "Panel",
    settings: "Ajustes",
    logout: "Cerrar sesión",
  },
  hero: {
    titleFirst: "Descubre las mejores",
    titleSecond: "empresas unipersonales de China",
    subtitle:
      "CN OPC recopila las mejores empresas unipersonales, desarrolladores independientes y freelancers de China",
    cta: "Registra tu empresa",
    items: "registros",
    categories: "categorías",
    updatedToday: "Actualizado hoy",
    updatedWeek: "Actualizado esta semana",
    updatedMonth: "Actualizado este mes",
    updatedOn: "Última actualización: {date}",
    collecting: "Recopilando",
    collectingCta: "Seguimos recopilando: registra tu empresa unipersonal",
  },
  home: {
    latest: "Últimos registros",
    hot: "Tendencias",
    categories: "Explorar categorías",
    picks: "Selección del editor",
    posts: "Últimos artículos",
    viewAllItems: "Ver todos los registros",
    viewAllCategories: "Todas las categorías",
    viewAllPosts: "Todos los artículos",
    countItems: "{n} registros",
    noItems: "Aún no hay registros",
  },
  search: {
    placeholder: "Buscar empresas unipersonales",
    allCategories: "Todas las categorías",
    selectTags: "Elegir etiquetas",
    reset: "Restablecer",
    sortTimeDesc: "Más recientes",
    sortTimeAsc: "Más antiguos",
    sortNameDesc: "Nombre Z–A",
    sortNameAsc: "Nombre A–Z",
    noFilter: "Sin filtro",
    featured: "Destacado",
    noResults: "No se encontró nada.",
    noResultsFound: "No se encontraron resultados.",
    search: "Buscar",
  },
  item: {
    visitWebsite: "Visitar sitio web",
    details: "Detalles",
    featured: "Destacado",
    sponsored: "Patrocinado",
    introduction: "Introducción",
    information: "Información",
    publisher: "Publicado por",
    website: "Sitio web",
    publishedDate: "Fecha de publicación",
    categories: "Categorías",
    tags: "Etiquetas",
    moreProducts: "Más productos",
  },
  footer: {
    tagline: "Las mejores empresas unipersonales de China",
    product: "Producto",
    resources: "Recursos",
    pages: "Páginas",
    company: "Empresa",
    search: "Buscar",
    collection: "Colecciones",
    category: "Categorías",
    tag: "Etiquetas",
    blog: "Blog",
    pricing: "Precios",
    submit: "Enviar",
    studio: "Studio",
    home2: "Inicio 2",
    home3: "Inicio 3",
    collection1: "Colección 1",
    collection2: "Colección 2",
    about: "Sobre nosotros",
    privacy: "Política de privacidad",
    terms: "Términos de servicio",
    sitemap: "Mapa del sitio",
    copyright: "Todos los derechos reservados.",
  },
  auth: {
    welcomeBack: "Te damos la bienvenida",
    createAccount: "Crear una cuenta",
    noAccount: "¿No tienes cuenta? Regístrate",
    hasAccount: "¿Ya tienes cuenta? Inicia sesión",
    email: "Correo electrónico",
    password: "Contraseña",
    name: "Nombre",
    forgotPassword: "¿Olvidaste la contraseña?",
    login: "Iniciar sesión",
    createAccountBtn: "Crear una cuenta",
    loginGoogle: "Iniciar sesión con Google",
    loginGithub: "Iniciar sesión con GitHub",
    somethingWrong: "Algo salió mal",
    emailInUse: "¡Este correo ya está registrado con otro proveedor!",
  },
  common: {
    back: "Volver",
  },
  misc: {
    backHome: "Volver al inicio",
    backLogin: "Volver al inicio de sesión",
    oops: "¡Ups! Algo salió mal.",
    sendResetEmail: "Enviar correo de restablecimiento",
    resetPasswordTitle: "Restablecer contraseña",
    forgotPasswordTitle: "¿Olvidaste la contraseña?",
    confirmingVerification: "Confirmando tu verificación",
    missingToken: "¡Falta el token!",
    blogSubtitle: "Lee nuestros últimos artículos",
    category: "Categoría",
    collection: "Colección",
    blog: "Blog",
    tryAgain: "Inténtalo de nuevo.",
    tryAgainBtn: "Reintentar",
    exploreCollections: "Explorar colecciones",
  },
  pricing: {
    label: "Precios",
    title: "Elige tu plan",
    faqTitle: "Preguntas frecuentes",
  },
};

const pt: Dictionary = {
  nav: {
    signIn: "Entrar",
    language: "Idioma",
    home: "Início",
    home2: "Início 2",
    home3: "Início 3",
    search: "Buscar",
    collection: "Coleções",
    category: "Categorias",
    tag: "Tags",
    blog: "Blog",
    pricing: "Preços",
    submit: "Enviar",
    studio: "Studio",
    dashboard: "Painel",
    settings: "Configurações",
    logout: "Sair",
  },
  hero: {
    titleFirst: "Descubra as melhores",
    titleSecond: "empresas de uma pessoa só na China",
    subtitle:
      "A CN OPC reúne as melhores empresas de uma pessoa só, desenvolvedores independentes e freelancers da China",
    cta: "Cadastre sua empresa",
    items: "cadastros",
    categories: "categorias",
    updatedToday: "Atualizado hoje",
    updatedWeek: "Atualizado nesta semana",
    updatedMonth: "Atualizado neste mês",
    updatedOn: "Última atualização: {date}",
    collecting: "Coletando",
    collectingCta: "Ainda coletando — cadastre sua empresa de uma pessoa só",
  },
  home: {
    latest: "Cadastros recentes",
    hot: "Em alta",
    categories: "Explorar categorias",
    picks: "Escolhas do editor",
    posts: "Artigos recentes",
    viewAllItems: "Ver todos os cadastros",
    viewAllCategories: "Todas as categorias",
    viewAllPosts: "Todos os artigos",
    countItems: "{n} cadastros",
    noItems: "Nenhum cadastro ainda",
  },
  search: {
    placeholder: "Buscar empresas de uma pessoa só",
    allCategories: "Todas as categorias",
    selectTags: "Escolher tags",
    reset: "Redefinir",
    sortTimeDesc: "Mais recentes",
    sortTimeAsc: "Mais antigos",
    sortNameDesc: "Nome Z–A",
    sortNameAsc: "Nome A–Z",
    noFilter: "Sem filtro",
    featured: "Destaque",
    noResults: "Nada encontrado.",
    noResultsFound: "Nenhum resultado encontrado.",
    search: "Buscar",
  },
  item: {
    visitWebsite: "Visitar site",
    details: "Detalhes",
    featured: "Destaque",
    sponsored: "Patrocinado",
    introduction: "Introdução",
    information: "Informações",
    publisher: "Publicado por",
    website: "Site",
    publishedDate: "Data de publicação",
    categories: "Categorias",
    tags: "Tags",
    moreProducts: "Mais produtos",
  },
  footer: {
    tagline: "As melhores empresas de uma pessoa só na China",
    product: "Produto",
    resources: "Recursos",
    pages: "Páginas",
    company: "Empresa",
    search: "Buscar",
    collection: "Coleções",
    category: "Categorias",
    tag: "Tags",
    blog: "Blog",
    pricing: "Preços",
    submit: "Enviar",
    studio: "Studio",
    home2: "Início 2",
    home3: "Início 3",
    collection1: "Coleção 1",
    collection2: "Coleção 2",
    about: "Sobre nós",
    privacy: "Política de privacidade",
    terms: "Termos de serviço",
    sitemap: "Mapa do site",
    copyright: "Todos os direitos reservados.",
  },
  auth: {
    welcomeBack: "Bem-vindo de volta",
    createAccount: "Criar uma conta",
    noAccount: "Não tem conta? Cadastre-se",
    hasAccount: "Já tem conta? Entre",
    email: "E-mail",
    password: "Senha",
    name: "Nome",
    forgotPassword: "Esqueceu a senha?",
    login: "Entrar",
    createAccountBtn: "Criar uma conta",
    loginGoogle: "Entrar com Google",
    loginGithub: "Entrar com GitHub",
    somethingWrong: "Algo deu errado",
    emailInUse: "Este e-mail já está registrado com outro provedor!",
  },
  common: {
    back: "Voltar",
  },
  misc: {
    backHome: "Voltar ao início",
    backLogin: "Voltar ao login",
    oops: "Ops! Algo deu errado!",
    sendResetEmail: "Enviar e-mail de redefinição",
    resetPasswordTitle: "Redefinir senha",
    forgotPasswordTitle: "Esqueceu a senha?",
    confirmingVerification: "Confirmando sua verificação",
    missingToken: "Token ausente!",
    blogSubtitle: "Leia nossos artigos mais recentes",
    category: "Categoria",
    collection: "Coleção",
    blog: "Blog",
    tryAgain: "Tente novamente.",
    tryAgainBtn: "Tentar novamente",
    exploreCollections: "Explorar coleções",
  },
  pricing: {
    label: "Preços",
    title: "Escolha seu plano",
    faqTitle: "Perguntas frequentes",
  },
};

const de: Dictionary = {
  nav: {
    signIn: "Anmelden",
    language: "Sprache",
    home: "Start",
    home2: "Start 2",
    home3: "Start 3",
    search: "Suche",
    collection: "Sammlungen",
    category: "Kategorien",
    tag: "Tags",
    blog: "Blog",
    pricing: "Preise",
    submit: "Einreichen",
    studio: "Studio",
    dashboard: "Dashboard",
    settings: "Einstellungen",
    logout: "Abmelden",
  },
  hero: {
    titleFirst: "Entdecke die besten",
    titleSecond: "Ein-Personen-Unternehmen Chinas",
    subtitle:
      "CN OPC listet die besten Ein-Personen-Unternehmen, Indie-Entwickler und Freelancer in China",
    cta: "Trage dein Unternehmen ein",
    items: "Einträge",
    categories: "Kategorien",
    updatedToday: "Heute aktualisiert",
    updatedWeek: "Diese Woche aktualisiert",
    updatedMonth: "Diesen Monat aktualisiert",
    updatedOn: "Zuletzt aktualisiert: {date}",
    collecting: "Wird gesammelt",
    collectingCta: "Wir sammeln weiter — trage dein Ein-Personen-Unternehmen ein",
  },
  home: {
    latest: "Neueste Einträge",
    hot: "Trends",
    categories: "Kategorien durchsuchen",
    picks: "Empfehlungen der Redaktion",
    posts: "Neueste Artikel",
    viewAllItems: "Alle Einträge ansehen",
    viewAllCategories: "Alle Kategorien",
    viewAllPosts: "Alle Artikel",
    countItems: "{n} Einträge",
    noItems: "Noch keine Einträge",
  },
  search: {
    placeholder: "Ein-Personen-Unternehmen suchen",
    allCategories: "Alle Kategorien",
    selectTags: "Tags auswählen",
    reset: "Zurücksetzen",
    sortTimeDesc: "Neueste zuerst",
    sortTimeAsc: "Älteste zuerst",
    sortNameDesc: "Name Z–A",
    sortNameAsc: "Name A–Z",
    noFilter: "Kein Filter",
    featured: "Empfohlen",
    noResults: "Nichts gefunden.",
    noResultsFound: "Keine Ergebnisse gefunden.",
    search: "Suche",
  },
  item: {
    visitWebsite: "Website besuchen",
    details: "Details",
    featured: "Empfohlen",
    sponsored: "Gesponsert",
    introduction: "Vorstellung",
    information: "Informationen",
    publisher: "Herausgeber",
    website: "Website",
    publishedDate: "Veröffentlichungsdatum",
    categories: "Kategorien",
    tags: "Tags",
    moreProducts: "Weitere Produkte",
  },
  footer: {
    tagline: "Die besten Ein-Personen-Unternehmen Chinas",
    product: "Produkt",
    resources: "Ressourcen",
    pages: "Seiten",
    company: "Unternehmen",
    search: "Suche",
    collection: "Sammlungen",
    category: "Kategorien",
    tag: "Tags",
    blog: "Blog",
    pricing: "Preise",
    submit: "Einreichen",
    studio: "Studio",
    home2: "Start 2",
    home3: "Start 3",
    collection1: "Sammlung 1",
    collection2: "Sammlung 2",
    about: "Über uns",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    sitemap: "Sitemap",
    copyright: "Alle Rechte vorbehalten.",
  },
  auth: {
    welcomeBack: "Willkommen zurück",
    createAccount: "Konto erstellen",
    noAccount: "Noch kein Konto? Registrieren",
    hasAccount: "Schon ein Konto? Anmelden",
    email: "E-Mail",
    password: "Passwort",
    name: "Name",
    forgotPassword: "Passwort vergessen?",
    login: "Anmelden",
    createAccountBtn: "Konto erstellen",
    loginGoogle: "Mit Google anmelden",
    loginGithub: "Mit GitHub anmelden",
    somethingWrong: "Etwas ist schiefgelaufen",
    emailInUse: "Diese E-Mail ist bereits über einen anderen Anbieter registriert!",
  },
  common: {
    back: "Zurück",
  },
  misc: {
    backHome: "Zurück zur Startseite",
    backLogin: "Zurück zur Anmeldung",
    oops: "Ups! Etwas ist schiefgelaufen!",
    sendResetEmail: "E-Mail zum Zurücksetzen senden",
    resetPasswordTitle: "Passwort zurücksetzen",
    forgotPasswordTitle: "Passwort vergessen?",
    confirmingVerification: "Bestätigung wird geprüft",
    missingToken: "Token fehlt!",
    blogSubtitle: "Lies unsere neuesten Blogartikel",
    category: "Kategorie",
    collection: "Sammlung",
    blog: "Blog",
    tryAgain: "Bitte versuche es erneut.",
    tryAgainBtn: "Erneut versuchen",
    exploreCollections: "Sammlungen entdecken",
  },
  pricing: {
    label: "Preise",
    title: "Wähle deinen Tarif",
    faqTitle: "Häufige Fragen",
  },
};

export const dictionaries: Record<Locale, Dictionary> = {
  zh,
  en,
  ja,
  ko,
  fr,
  es,
  pt,
  de,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.zh;
}

/** Resolve a dot-path like "nav.signIn", with {n}/{date} interpolation. */
export function translate(
  dict: Dictionary,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const value = key
    .split(".")
    .reduce<unknown>((acc, part) => {
      if (acc && typeof acc === "object") {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, dict);
  if (typeof value !== "string") {
    return key;
  }
  if (!vars) {
    return value;
  }
  return Object.entries(vars).reduce(
    (text, [k, v]) => text.replaceAll(`{${k}}`, String(v)),
    value,
  );
}
