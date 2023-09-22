import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

// export const fetchUserDetails = selector({
//     key: 'userDetailsSelector',
//     get: async ({ get }) => {
//         try{
//             const response = await fetch('https://dummyapi.online/api/movies');
//             const data = await response.json();
//             return data;
//         }catch(error){
//             throw error;
//         }
//     }
// });

  
  export const  Moviedata = atom({
    key: "Moviedata",
    default: JSON.parse(window.localStorage.getItem("num") || "[]")
  })



 
  export const login = atom({
    key: 'login',
    default: false, // Initialize the default value as false since the user is initially not logged in.
  });


  export const charCountState = selector({
    key: 'charCountState', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const text = get(Moviedata);
  
      return text.length;
    },
  });

