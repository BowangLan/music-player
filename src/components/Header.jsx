import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { HiMenu, HiX } from "react-icons/hi";
import { useHeader } from "../store";
import { HiChevronLeft } from "react-icons/hi";
import IconContainer from "./icons/IconContainer";
import { navItems } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItemUrls = navItems.map((m) => m.url);
const isRootPath = (path) => navItemUrls.includes(path);
const headerAbsoluteUrls = ["/album/[id]", "/artist/[id]"];

const mobile_transition = {
  duration: 0.5,
  // ease: "easeOut",
  type: "spring",
  // damping: 12,
  // bounce: 0.9,
};

const mobile_menu_variants = {
  hidden: {
    opacity: 0,
    x: "100%",
    transition: mobile_transition,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: mobile_transition,
  },
};

const mobile_menu_overlay = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const NavItem = ({ item, i }) => {
  const router = useRouter();
  return (
    <li className="w-full relative group">
      <Link key={i} href={item.url} passHref>
        <a
          className={`w-full h-12 flex items-center px-4 rounded-lg group-hover:bg-blue-300 transition-all duration-300 ${
            router.pathname === item.url ? `bg-blue-200` : "bg-slate-100"
          }`}
        >
          {item.text}
        </a>
      </Link>
      {router.pathname === item.url && (
        <div
          className={`absolute -right-6 top-0 bottom-0 w-1.5 rounded-lg bg-blue-300 group-hover:bg-blue-400 transition-all duration-300`}
        ></div>
      )}
    </li>
  );
};

const MobileMenu = ({ close, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-slate-800/60 z-40"
            variants={mobile_menu_overlay}
            initial="hidden"
            animate="show"
            exit="hidden"
          ></motion.div>
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 bg-slate-200 shadow-lg"
            variants={mobile_menu_variants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <div className="w-full h-full px-8">
              <div className="h-16 flex items-center">
                <div className="flex-1"></div>
                <IconContainer onClick={close}>
                  <HiX size={24} />
                </IconContainer>
              </div>
              <ul className="py-6 flex flex-col gap-4">
                {navItems.map((item, i) => (
                  <NavItem key={i} item={item} i={i} />
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function Header({ absolute }) {
  const {
    background,
    title,
    setBackgroundToDefault,
    headerAbsolute,
    setHeaderAbsolute,
  } = useHeader();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isRootPath(router.pathname)) {
      setBackgroundToDefault();
    }

    console.log("router.pathname", router.pathname);
  }, [router.pathname]);

  return (
    <header
      className={`${
        absolute ? "absolute top-0 left-0" : ""
      } w-full px-8 h-16 flex-none flex items-center transition-all duration-300 ${background} z-20`}
    >
      {/* Left */}
      <div className="flex items-center">
        <div className={`mr-4 ${isRootPath(router.pathname) ? "hidden" : ""}`}>
          <IconContainer onClick={() => router.back()}>
            <HiChevronLeft size={24} className="" />
          </IconContainer>
        </div>
        <span className="inline-block lg:hidden text-xl font-semibold">
          {title}
        </span>
      </div>

      {/* Right */}
      <div className="flex-1"></div>

      {/* Middle */}
      <div className="block lg:hidden">
        <IconContainer
          onClick={() => {
            setMobileMenuOpen(true);
          }}
        >
          <HiMenu size={24} className="" />
        </IconContainer>
        <MobileMenu
          isOpen={mobileMenuOpen}
          close={() => setMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
}
