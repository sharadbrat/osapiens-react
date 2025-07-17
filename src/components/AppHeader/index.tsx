import { Grow, Box, Theme, Toolbar, Typography, Select } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../api/services/User/store";
import AvatarMenu from "../AvatarMenu";
import LanguageSelect from "../LanguageSelect";

interface AppBarProps extends MuiAppBarProps {
  theme?: Theme;
}

interface AppHeaderProps {
  user: User;
  pageTitle: string;
}

const typoStyle = {
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  lineHeight: 1,
};

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  height: theme.tokens.header.height,
}));

const secondsToDisplayedCountdown = (seconds: number) => {
  if (seconds <= 0) {
    return "00:00";
  }

  const mm = `${~~(seconds / 60)}`.padStart(2, "0");
  const ss = (seconds % 60).toFixed(0).padStart(2, "0");
  return `${mm}:${ss}`;
};

// 1 hour
const COUNTDOWN_SECONDS = 60 * 60;
const COUNTDOWN_REFRESH_RATE = 1000 / 60;
const AppHeader = React.forwardRef((props: AppHeaderProps, ref) => {
  const { user, pageTitle } = props;
  const { t } = useTranslation("app");
  const theme = useTheme();

  const [countdownStartDate] = useState(new Date());
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const displayedCountdown = secondsToDisplayedCountdown(countdown);

  // This can be easily replaced with .requestAnimationFrame() but for the sake
  // of this example I decided to leave the interval
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Timer tick');
      const currentTimeSeconds = new Date().getTime() / 1000;
      const startTimeSeconds = countdownStartDate.getTime() / 1000;
      const passedTimeSeconds = ~~(currentTimeSeconds - startTimeSeconds);
      const countdownSeconds = COUNTDOWN_SECONDS - passedTimeSeconds;
      setCountdown(countdownSeconds);

      if (countdownSeconds <= 0) {
        console.log('Clear interval as the timer is stopped.');
        clearInterval(interval);
      }
      // 60 FPS
    }, COUNTDOWN_REFRESH_RATE);
  }, []);

  return (
    <AppBar ref={ref} position="fixed" sx={{ width: "100vw" }}>
      <Toolbar sx={{ background: "#08140C 0% 0% no-repeat padding-box" }}>
        <Box sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
          <Box>
            <Typography variant="h6" component="div" color="primary">
              {displayedCountdown}
            </Typography>
          </Box>
          <Box sx={{ width: 20, height: 20, flex: 1 }} />
          <Box sx={{ flex: 2 }}>
            <Typography
              sx={{
                ...typoStyle,
                color: theme.palette.primary.main,
                mb: theme.spacing(0.5),
              }}
              variant="h6"
              component="div"
            >
              {t("appTitle").toLocaleUpperCase()}
            </Typography>
            <Typography
              sx={{ ...typoStyle }}
              variant="overline"
              component="div"
              noWrap
            >
              {pageTitle.toLocaleUpperCase()}
            </Typography>
          </Box>
          <Box sx={{ flex: 1, justifyContent: "flex-end", display: "flex" }}>
            <LanguageSelect />
            {user && user.eMail && (
              <Grow in={Boolean(user && user.eMail)}>
                <AvatarMenu user={user} />
              </Grow>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default AppHeader;
