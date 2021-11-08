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
import LostAndFoundState from './context/lostAndFound/LostAndFoundState';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <UserState>
        <LostAndFoundState>
          <StudyBuddyState>
            <ScrollToTop />
            <GlobalStyles />
            <BaseOptionChartStyle />
            <Router />
          </StudyBuddyState>
        </LostAndFoundState>
      </UserState>
    </ThemeConfig>
  );
}
