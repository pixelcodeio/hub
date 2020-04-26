import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const ScrollToTopComponent = ({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, []);

  return (null);
}

export const ScrollToTop = withRouter(ScrollToTopComponent);