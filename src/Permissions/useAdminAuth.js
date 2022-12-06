import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { checkUserIsAdmin } from './checkUserIsAdmin';


const useAdminAuth = props => {
  const auth = getAuth();

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
  setUser(currentUser);
  });

  const history = useHistory();

  useEffect(() => { 
    
    if (!user)
    {
      console.log("access denied not user")
      history.push('/');
    }
    checkUserIsAdmin(user).then(x => { console.log(x);
    if (!x)
    {
      console.log("access denied not admin")
      history.push('/');
    }
    } )    

  }, [user]);
  console.log("access granted admin")

  return user;
}

export default useAdminAuth;