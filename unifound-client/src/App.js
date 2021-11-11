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
import ChatState from './context/chat/ChatState';
import AnnouncementState from './context/announcement/AnnouncementState';
import TextbookState from './context/textbook/TextbookState';
import AlertState from './context/alert/AlertState';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <AlertState>
        <UserState>
          <AnnouncementState>
            <TextbookState>
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
            </TextbookState>
          </AnnouncementState>
        </UserState>
      </AlertState>
    </ThemeConfig>
  );
}
