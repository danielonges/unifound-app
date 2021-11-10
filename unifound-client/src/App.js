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
<<<<<<< HEAD
import ChatState from './context/chat/ChatState';
=======
import AnnouncementState from './context/announcement/AnnouncementState';
import TextbookState from './context/textbook/TextbookState';
>>>>>>> 156415d21e356b3ff282d69e1d77eaafebfc130f
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <UserState>
<<<<<<< HEAD
        <LostAndFoundState>
          <StudyBuddyState>
            <ChatState>
              <ScrollToTop />
              <GlobalStyles />
              <BaseOptionChartStyle />
              <Router />
            </ChatState>
          </StudyBuddyState>
        </LostAndFoundState>
=======
        <AnnouncementState>
          <TextbookState>
            <LostAndFoundState>
              <StudyBuddyState>
                <ScrollToTop />
                <GlobalStyles />
                <BaseOptionChartStyle />
                <Router />
              </StudyBuddyState>
            </LostAndFoundState>
          </TextbookState>
        </AnnouncementState>
>>>>>>> 156415d21e356b3ff282d69e1d77eaafebfc130f
      </UserState>
    </ThemeConfig>
  );
}
