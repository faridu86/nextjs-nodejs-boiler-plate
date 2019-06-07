import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { userSignOut as signOut } from '../src/store/actions/auth';
import LoginFrom from '../src/components/Login';

function Home(props) {
  const { authUser, signOut: signOutUser } = props;

  const logoutUser = () => {
    signOutUser();
  };
  return (
    <div>
      <div>Welcome to Next.js! {(authUser && authUser.username) || ''}</div>
      <br />
      <br />
      {(authUser && authUser.username && (
        <div>
          {JSON.stringify(authUser)}
          <Button onClick={logoutUser}>Logout</Button>
        </div>
      )) || (
        <LoginFrom />
      )}
    </div>
  );
}

// eslint-disable-next-line
Home.getInitialProps = async ({ req }) => {
  // async method to load data and pass to component as props.
  const stars = 5;
  return { stars };
};

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
