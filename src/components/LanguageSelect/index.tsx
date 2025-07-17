import { MenuItem, Select as MuiSelect, SelectProps, styled } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { defaultLanguages } from "../../i18n";

const Select = styled(MuiSelect)<SelectProps>(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  marginRight: theme.spacing(1),
  height: theme.tokens.languageSelect.height,
}));

const LanguageSelect = () => {
  const { t, i18n } = useTranslation("app");
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Select
      value={i18n.language}
      label={t("language")}
      onChange={(e) => handleLanguageChange(e.target.value as string)}
    >
      {defaultLanguages.map((language) => (
        <MenuItem value={language} key={language}>{t(`languages.${language}`)}</MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSelect;
