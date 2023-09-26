1. login layout 
    - create layout component
    - check login
    - also show loader in this
2. remove header for single movie info screen
3. add to watch list by user_id
4. use axios 
5. create custom hooks for API calls
6. create two button component for next and previous
    - carousal
    - slick
7. use debounce in search
    - show loader while api is calling
8. sorting and filtering using query params
9. API calling fix 
10. remove settimeout loaders
11. create svg image components
12. Footer
    - config.js
        const footerList = [
            {
                name : "Get TMDB Tab",
                className : "p-1",
                link : "https://google.com"
            },
            ...     
        ]
13. confirmation message before logout
14. Show skelaton loader for single movie page
15. create component for input
16. Show loader in login button
17. Show loader in singup/logout
18. Check 404 page
    - do not reload the page on go to home button
19. remove ternory operator
20. Routes using config
    - config.js
        const routes = [
            {
                name:"Home",
                route:"/home",
                component: <Home/>
                active: true,
                isAuth: true
            },
            ...
        ]
21. Add local validation for login & singup
    -  login
        - username , password (show hide button for password)
    - signup
        - name, email, password required
        - email validation
        - password length validation
        - contain uppercase, lowercase, number, 1 special char, minimum length 8
        - do not call firebase API if validation fail
    