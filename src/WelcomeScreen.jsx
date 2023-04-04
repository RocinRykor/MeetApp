import React from 'react';
import './scss/styles.scss';

function WelcomeScreen(props) {
  return props.showWelcomeScreen ?
      (
          <div className="WelcomeScreen">
            <div className={"welcome-title"}>
              <h1>Welcome to the Meet app</h1>
              <h4>
                Log in to see upcoming events around the world for
                full-stack
                developers
              </h4>
            </div>
            <div className="button_cont" align="center">
              <div class="google-btn">
                <div class="google-icon-wrapper">
                  <img
                      class="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Log
o.svg"
                      alt="Google sign-in"
                  />
                </div>
                <button onClick={() => { props.getAccessToken(); }}
                        rel="nofollow noopener"
                        class="btn-text"
                >
                  <b>Sign in with google</b>
                </button>
              </div>
            </div>
            <a
                href="https://rocinrykor.github.io/MeetApp/privacy.html"
                rel="nofollow noopener"
                className={"privacy-link"}
            >
              Click here to review the Privacy Policy
            </a>
          </div>
      )
      : null;
}

export default WelcomeScreen;