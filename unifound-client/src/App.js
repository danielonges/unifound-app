// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import UserState from './context/user/UserState';
import StudyBuddyState from './context/studyBuddy/StudyBuddyState';
import LostAndFoundState from './context/lostAndFound/LostAndFoundState';
import ChatState from './context/chat/ChatState';
import AnnouncementState from './context/announcement/AnnouncementState';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <UserState>
        <AnnouncementState>
          <LostAndFoundState>
            <StudyBuddyState>
              <ChatState>
                <ScrollToTop />
                <GlobalStyles />
                <Router />
              </ChatState>
            </StudyBuddyState>
          </LostAndFoundState>
        </AnnouncementState>
      </UserState>
    </ThemeConfig>
  );
}
