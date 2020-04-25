import React from "react"

export const SignInView: React.FC = (props) => {
  return (
    <a href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic,identity.email,identity.team,identity.avatar&amp;client_id=1085915442018.1079182647094&amp;redirect_uri=https://snappy-flash-275303.ue.r.appspot.com/oauth">
      <img alt="sign in with slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" />
    </a>
  )
}