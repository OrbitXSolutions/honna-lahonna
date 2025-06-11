"use client";
import { ROUTES } from "@/lib/constants/routes";
import { X, LogOut, LogIn, UserPlus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import Logo from "../atoms/logo";
import { NavMenuLink } from "../atoms/nav-menu-link";
import { Button } from "../ui/button";
import {
  Home,
  Users,
  Briefcase,
  BookOpen,
  HelpCircle,
  Phone,
  UserCircle,
} from "lucide-react";
import { IconArrow } from "../icons";
import Link from "next/link";
import AppButton from "../atoms/app-button";
import AppLink from '../atoms/app-link';
import { useSupabaseUser } from "@/hooks/use-supabase-user";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  // user: User | null
  // onSignOut?: () => Promise<void>;
  [key: string]: any;
}

export default function NavMenu({ isOpen, onClose }: Props) {
  const { user, loading, mounted } = useSupabaseUser();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { label: "الرئيسية", href: ROUTES.HOME, icon: Home },
    { label: "من نحن", href: ROUTES.ABOUT, icon: Users },
    { label: "خدماتنا", href: ROUTES.SERVICES, icon: Briefcase },
    { label: "شركاء النجاح", href: ROUTES.PARTNERS, icon: BookOpen },
    { label: "الآراء", href: ROUTES.TESTIMONIALS, icon: HelpCircle },
    { label: "الأسئلة الشائعة", href: ROUTES.FAQ, icon: Phone },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  const handleSignOutClick = async () => {
    // await onSignOut?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden h-dvh w-dvw"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.4,
            }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-white z-50 lg:hidden flex !flex-col h-dvh"
          >
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-white flex-shrink-0">
              <Logo className="h-10 sm:h-12 w-auto" />
              <motion.button
                onClick={onClose}
                className="p-2 text-gray-700 cursor-pointer hover:text-primary transition-colors rounded-full hover:bg-gray-100"
                whileTap={{ scale: 0.95 }}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </div>
            <div className="flex-1 flex !flex-col overflow-y-auto bg-gradient-to-b from-white to-primary-50">
              <nav className="flex-1 p-4 sm:p-6">
                <ul className="space-y-1 sm:space-y-2">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.1 + index * 0.05,
                          duration: 0.3,
                        }}
                      >
                        <NavMenuLink
                          href={item.href}
                          onLoad={handleLinkClick}
                          className="flex items-center gap-3 py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-xl font-medium text-gray-700 hover:text-primary hover:bg-primary-light rounded-xl transition-all duration-200 border border-transparent hover:border-primary/20"
                        >
                          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                          {item.label}
                        </NavMenuLink>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
              <motion.div
                className="mx-4 sm:mx-6 border-t border-gray-200"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              />
              <div className="p-4 sm:p-6 flex-shrink-0">
                <motion.div
                  className="space-y-3 flex flex-col sm:space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  {user ? (
                    <>
                      <Link href="/profile" onClick={handleLinkClick}>
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full border-2 border-primary text-primary hover:bg-primary-light rounded-xl py-3 sm:py-4 text-base sm:text-lg font-medium flex items-center justify-center gap-2"
                        >
                          <UserCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                          {user.user_metadata["first_name"] ? user.user_metadata["first_name"][0].toUpperCase() : "U"}
                        </Button>
                      </Link>
                      <AppButton

                        variant="outline"
                        size="lg"
                        className="w-full border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-xl py-3 sm:py-4 text-base sm:text-lg font-medium flex items-center justify-center gap-2"
                      >
                        <AppLink href={ROUTES.LOGOUT} onClick={handleSignOutClick}>
                          <LogOut className="h-5 w-5 sm:h-6 sm:w-6" />
                          {"تسجيل الخروج"}
                        </AppLink>
                      </AppButton>
                    </>
                  ) : (
                    <>
                      <AppButton
                        asChild
                        variant="outline"
                        size="lg"
                        className="w-full border-2 border-primary text-primary hover:bg-primary-light rounded-xl py-3 sm:py-4 text-base sm:text-lg font-medium flex items-center justify-center gap-2"
                      >
                        <AppLink href={ROUTES.LOGIN} onClick={handleLinkClick}>
                          <LogIn className="h-5 w-5 sm:h-6 sm:w-6" />
                          {"تسجيل الدخول"}
                        </AppLink>
                      </AppButton>

                      <Button
                        size="lg"
                        asChild
                        className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3 sm:py-4 text-base sm:text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <AppLink href={ROUTES.LOGOUT} onClick={handleLinkClick}>
                          <UserPlus className="h-5 w-5 sm:h-6 sm:w-6" />
                          <span>{"تسجيل"}</span>
                          <IconArrow />
                        </AppLink>
                      </Button>
                    </>
                  )}

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-3 sm:py-4 text-base sm:text-lg font-medium"
                  >
                    <AppLink
                      href="/provider-registration"
                      onClick={handleLinkClick}
                    >
                      {"تسجيل كمزود الخدمة"}
                    </AppLink>
                  </Button>
                </motion.div>
              </div>
            </div>
            <motion.div
              className="p-4 sm:p-6 bg-primary-light border-t border-primary/10 flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <p className="text-center text-xs sm:text-sm text-gray-600">
                © {new Date().getFullYear()}{" "}
                {"جميع الحقوق محفوظة لمؤسسة هن لهن"}. {"تطوير: "}
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
