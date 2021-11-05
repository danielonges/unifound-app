// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import UserState from './context/user/UserState';
import StudyBuddyState from './context/studyBuddy/StudyBuddyState';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <UserState>
        <StudyBuddyState>
          <ScrollToTop />
          <GlobalStyles />
          <BaseOptionChartStyle />
          <Router />
        </StudyBuddyState>
      </UserState>
    </ThemeConfig>
  );
}
