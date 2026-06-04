import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useEmblaCarousel } from "../_libs/embla-carousel-react.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { u as useServerFn } from "./createSsrRpc-BChoM5Ac.mjs";
import { g as getPdfDownloadUrl } from "./site.functions-8UEWq2mp.mjs";
import { b as bnClass, a as bnNum } from "./grading-0NP-FUhN.mjs";
import "../_libs/seroval.mjs";
import { F as FileText, L as LoaderCircle, r as Download, A as ArrowLeft, s as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/embla-carousel-reactive-utils.mjs";
import "../_libs/embla-carousel.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "./server-B3epVi8w.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./auth-middleware-yOiDSkhF.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/zod.mjs";
const CarouselContext = reactExports.createContext(null);
function useCarousel() {
  const context = reactExports.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = reactExports.forwardRef(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = reactExports.useState(false);
  const [canScrollNext, setCanScrollNext] = reactExports.useState(false);
  const onSelect = reactExports.useCallback((api2) => {
    if (!api2) {
      return;
    }
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = reactExports.useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = reactExports.useCallback(() => {
    api?.scrollNext();
  }, [api]);
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );
  reactExports.useEffect(() => {
    if (!api || !setApi) {
      return;
    }
    setApi(api);
  }, [api, setApi]);
  reactExports.useEffect(() => {
    if (!api) {
      return;
    }
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CarouselContext.Provider,
    {
      value: {
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref,
          onKeyDownCapture: handleKeyDown,
          className: cn("relative", className),
          role: "region",
          "aria-roledescription": "carousel",
          ...props,
          children
        }
      )
    }
  );
});
Carousel.displayName = "Carousel";
const CarouselContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        className: cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        ),
        ...props
      }
    ) });
  }
);
CarouselContent.displayName = "CarouselContent";
const CarouselItem = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        role: "group",
        "aria-roledescription": "slide",
        className: cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        ),
        ...props
      }
    );
  }
);
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = reactExports.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute  h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollPrev,
        onClick: scrollPrev,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Previous slide" })
        ]
      }
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = reactExports.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollNext,
        onClick: scrollNext,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Next slide" })
        ]
      }
    );
  }
);
CarouselNext.displayName = "CarouselNext";
const SITE_BUCKET = "site-assets";
function publicUrl(path) {
  const {
    data
  } = supabase.storage.from(SITE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
function Index() {
  const {
    data: hero
  } = useQuery({
    queryKey: ["pub-hero"],
    queryFn: async () => (await supabase.from("hero_slides").select("*").eq("is_active", true).order("sort_order")).data ?? []
  });
  const {
    data: courses
  } = useQuery({
    queryKey: ["pub-courses"],
    queryFn: async () => (await supabase.from("courses").select("*").eq("is_active", true).order("sort_order")).data ?? []
  });
  const {
    data: pdfs
  } = useQuery({
    queryKey: ["pub-pdfs"],
    queryFn: async () => (await supabase.from("pdf_notes").select("*").eq("is_active", true).order("created_at", {
      ascending: false
    })).data ?? []
  });
  const {
    data: gallery
  } = useQuery({
    queryKey: ["pub-gallery"],
    queryFn: async () => (await supabase.from("gallery_images").select("*").eq("is_active", true).order("sort_order")).data ?? []
  });
  const getUrl = useServerFn(getPdfDownloadUrl);
  const [loadingId, setLoadingId] = reactExports.useState(null);
  const handleDownload = async (id) => {
    setLoadingId(id);
    try {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (!session) {
        toast.error("ডাউনলোডের জন্য আগে লগইন করুন");
        window.location.href = "/login";
        return;
      }
      const res = await getUrl({
        data: {
          noteId: id
        }
      });
      window.open(res.url, "_blank");
    } catch (e) {
      toast.error(e.message ?? "ডাউনলোড ব্যর্থ");
    } finally {
      setLoadingId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-academy-soft text-academy-navy", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-academy-navy/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 h-20 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 bg-academy-navy rounded flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-academy-gold font-bold text-xl", children: "Σ" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base md:text-xl font-bold tracking-tight", children: "সমীকরণ শিক্ষা পরিবার" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-8 font-medium text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#home", className: "hover:text-academy-gold", children: "হোম" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#courses", className: "hover:text-academy-gold", children: "কোর্সসমূহ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#books", className: "hover:text-academy-gold", children: "পিডিএফ নোটস" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#gallery", className: "hover:text-academy-gold", children: "গ্যালারি" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", className: "hover:text-academy-gold", children: "যোগাযোগ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin", className: "text-academy-navy/70 hover:text-academy-gold", children: "এডমিন" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/login", className: "bg-academy-navy text-white px-6 py-2.5 rounded-full hover:bg-academy-gold", children: "লগইন" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex md:hidden items-center gap-2 text-sm font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin", className: "px-3 py-2 rounded-full border border-academy-navy/20", children: "এডমিন" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/login", className: "bg-academy-navy text-white px-4 py-2 rounded-full", children: "লগইন" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "home", className: "pt-8 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 md:px-6", children: hero && hero.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Carousel, { opts: {
      loop: true
    }, className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselContent, { children: hero.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: publicUrl(s.image_path), alt: s.title, className: "w-full aspect-[16/9] object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-academy-navy/90 via-academy-navy/30 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white", children: [
          s.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block px-3 py-1 rounded-full bg-academy-gold text-academy-navy text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3", children: s.badge }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl md:text-5xl font-bold mb-2 max-w-3xl", children: s.title }),
          s.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-lg text-white/80 max-w-2xl", children: s.subtitle })
        ] })
      ] }) }, s.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselPrevious, { className: "left-4 size-10 md:size-12 bg-white/90 hover:bg-academy-gold hover:text-white border-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselNext, { className: "right-4 size-10 md:size-12 bg-white/90 hover:bg-academy-gold hover:text-white border-0" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/9] rounded-3xl bg-academy-navy/5 flex items-center justify-center text-muted-foreground", children: "এডমিন প্যানেল থেকে ব্যানার যোগ করুন" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "courses", className: "py-20 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl lg:text-4xl font-bold mb-4", children: "আমাদের কোর্সসমূহ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "আপনার লক্ষ্য অর্জনে সঠিক বিভাগটি বেছে নিন" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-20 bg-academy-gold mt-4 rounded-full" })
      ] }),
      courses && courses.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: courses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-academy-soft rounded-2xl overflow-hidden border hover:shadow-2xl hover:-translate-y-1 transition-all", children: [
        c.image_path && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: publicUrl(c.image_path), alt: c.title, className: "w-full aspect-video object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
          c.tag && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-academy-gold uppercase tracking-tighter", children: c.tag }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mt-2 mb-3", children: c.title }),
          c.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: c.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6", children: [
            c.class_level && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              bnClass(c.class_level),
              " শ্রেণি"
            ] }),
            c.duration && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.duration })
            ] }),
            c.fee && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-academy-navy", children: c.fee })
            ] })
          ] })
        ] })
      ] }, c.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "কোনো কোর্স এখনো যোগ করা হয়নি।" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "books", className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-academy-gold uppercase tracking-widest", children: "শ্রেণিভিত্তিক" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl lg:text-4xl font-bold mt-3 mb-4", children: "পিডিএফ নোটস" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "লগইন করে নিজের শ্রেণির নোট ডাউনলোড করুন।" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-20 bg-academy-gold mx-auto mt-6 rounded-full" })
      ] }),
      pdfs && pdfs.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: pdfs.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group bg-white rounded-2xl p-6 border hover:border-academy-gold/40 hover:shadow-xl transition-all flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[3/4] rounded-xl bg-gradient-to-br from-academy-navy to-academy-navy/80 p-5 flex flex-col justify-between text-white shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-7 text-academy-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] uppercase tracking-widest text-academy-gold/80 mb-1", children: [
              bnClass(b.class_level),
              " শ্রেণি ",
              b.subject ? `• ${b.subject}` : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-bold leading-tight", children: b.title })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-2", children: b.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mb-4 flex items-center gap-2", children: [
          b.pages && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              bnNum(b.pages),
              " পৃষ্ঠা"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" })
          ] }),
          b.file_size_kb && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            (b.file_size_kb / 1024).toFixed(1),
            " MB"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDownload(b.id), disabled: loadingId === b.id, className: "mt-auto w-full py-2.5 bg-academy-soft text-academy-navy font-bold text-sm rounded-lg hover:bg-academy-navy hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50", children: [
          loadingId === b.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4" }),
          "ডাউনলোড করুন"
        ] })
      ] }, b.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground", children: "এখনো কোনো পিডিএফ নোট যোগ করা হয়নি।" })
    ] }) }),
    gallery && gallery.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "gallery", className: "py-20 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl lg:text-4xl font-bold mb-4", children: "গ্যালারি" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-20 bg-academy-gold mx-auto rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: gallery.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: publicUrl(g.image_path), alt: g.caption ?? "", className: "w-full aspect-square object-cover hover:scale-105 transition-transform" }),
        g.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-xs text-center", children: g.caption })
      ] }, g.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { id: "contact", className: "bg-academy-navy text-white py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-8 bg-academy-gold rounded flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-academy-navy font-bold", children: "Σ" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold", children: "সমীকরণ শিক্ষা পরিবার" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 max-w-sm leading-relaxed", children: "আমাদের লক্ষ্য শিক্ষার্থীদের ভিত্তি মজবুত করা এবং তাদের সুপ্ত প্রতিভাকে জাগ্রত করে উন্নত ক্যারিয়ার গঠনে সহযোগিতা করা।" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-lg font-bold mb-6", children: "দ্রুত লিংক" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-4 text-slate-400 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#courses", className: "hover:text-academy-gold", children: "কোর্সসমূহ" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#books", className: "hover:text-academy-gold", children: "পিডিএফ নোটস" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#gallery", className: "hover:text-academy-gold", children: "গ্যালারি" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-lg font-bold mb-6", children: "যোগাযোগ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-4 text-slate-400 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "৭৪, দক্ষিণ বাসাবো, গাজী বাড়ি, সবুজবাগ, ঢাকা।" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+8801920746162", className: "hover:text-academy-gold", children: "মোবাইল: ০১৯২০-৭৪৬১৬২" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 text-center", children: "© ২০২৫ সমীকরণ শিক্ষা পরিবার।" })
    ] }) })
  ] });
}
export {
  Index as component
};
