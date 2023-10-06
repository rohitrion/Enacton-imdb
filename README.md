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
17. Show loader in singup/button
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
    
watchList = {
    "QgfbKkteyjatiQGXsCjx10rKHCB2":[{"adult":false,"backdrop_path":"/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg","genre_ids":[28,9648,53,80],"id":762430,"original_language":"en","original_title":"Retribution","overview":"When a mysterious caller puts a bomb under his car seat, Matt Turner begins a high-speed chase across the city to complete a specific series of tasks. With his kids trapped in the back seat and a bomb that will explode if they get out of the car, a normal commute becomes a twisted game of life or death as Matt follows the stranger's increasingly dangerous instructions in a race against time to save his family.","popularity":1075.645,"poster_path":"/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg","release_date":"2023-08-23","title":"Retribution","video":false,"vote_average":6.8,"vote_count":280}],
    
    GLUzOefZodcfgysyy1hkUOirz1n2:[{"adult":false,"backdrop_path":"/h0nmmdFAdBjQttN8Y0q825MWzZp.jpg","genre_ids":[28,53,80],"id":926393,"original_language":"en","original_title":"The Equalizer 3","overview":"Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses. As events turn deadly, McCall knows what he has to do: become his friends' protector by taking on the mafia.","popularity":499.603,"poster_path":"/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg","release_date":"2023-08-30","title":"The Equalizer 3","video":false,"vote_average":7,"vote_count":287}]
}