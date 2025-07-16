import { LanguageObject, SearchObject } from "@/type/TypeCommon";
import { merge } from "lodash";
import { set } from "react-hook-form";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StoreLanguage = {
  languages: LanguageObject[];
  keyLanguage: string;
  setKeyLanguages: (value: { key: string }) => void;
  setLanguages: (value: { languages: LanguageObject[] }) => void;
};

type ThemeConfig = {
  keyTheme: string;
  setTheme: (value: { theme: string }) => void;
};

type PageConfig = {
  lstPage: {
    namePage: string;
    numberPage: number;
    lstSearch: SearchObject[];
  }[];
  setLocationPage: (value: {
    namePage: string;
    numberPage: number;
    lstSearch: SearchObject[];
  }) => void;
  // setLstSearchSave: (value: { lstSearch: SearchObject[] }) => void;
};

type ConfigurationStore = {
  languageConfig: StoreLanguage;
  themeConfig: ThemeConfig;
  pageConfig: PageConfig;
};

type RecentlyViewed = {
  lstRecently: { namePage: string; lstViewed: string };
  setItemViewed: (value: { namePage: string; itemCode: string }) => void;
};

export const useConfigurationStore = create<ConfigurationStore>()(
  persist(
    (set) => ({
      languageConfig: {
        keyLanguage: "",
        languages: [],
        setLanguages: (value) =>
          set((state) => ({
            languageConfig: {
              ...state.languageConfig,
              languages: value.languages,
            },
          })),
        setKeyLanguages: (value) =>
          set((state) => ({
            languageConfig: {
              ...state.languageConfig,
              keyLanguage: value.key,
            },
          })),
      },
      themeConfig: {
        keyTheme: "light",
        setTheme: (value) => {
          set((state) => ({
            themeConfig: {
              ...state.themeConfig,
              keyTheme: value.theme,
            },
          }));
        },
      },
      pageConfig: {
        lstPage: [],
        setLocationPage(value) {
          set((state) => ({
            pageConfig: {
              ...state.pageConfig,
              lstPage: [
                ...state.pageConfig.lstPage.filter(
                  (item) => item.namePage != value.namePage
                ),
                value,
              ],
            },
          }));
        },
      },
    }),
    {
      name: "config", // Tên lưu trữ trong localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        languageConfig: {
          keyLanguage: state.languageConfig.keyLanguage,
        },
        themeConfig: {
          keyTheme: state.themeConfig.keyTheme,
        },
      }),
      merge: (persistedState, currentState) => {
        const typedPersistedState =
          persistedState as Partial<ConfigurationStore>;
        return {
          languageConfig: merge(
            {},
            currentState.languageConfig,
            typedPersistedState.languageConfig
          ),
          themeConfig: merge(
            {},
            currentState.themeConfig,
            typedPersistedState.themeConfig
          ),
          pageConfig: merge(
            {},
            currentState.pageConfig,
            typedPersistedState.pageConfig
          ),
        };
      },
      // Đảm bảo sử dụng localStorage
    }
  )
);
