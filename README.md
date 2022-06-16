# SpaceSolar
Space project is investigating how we could model the solar system. Created a node server that returns a PI value and a webpage planet solar system that showcases the information like name radius and uses the PI value from the server to calculate the circumference of each planet.

**_Installation_**

1. Git clone project from 'https://github.com/jayson7990/SpaceSolar.git'
2. Move to the directory
3. Open terminal at the same folder level
4. Run 'yarn'
5. Run 'yarn start'

**_Usage_**

1. After starting the web server. Initial pi calculation already triggers, limit the digits at 10.
2. It can be increased to any digits by passing the parameter thru HTTP get e.g. http://localhost:8000/decimal?digit=20
3. Server will store the PI value by increasing the digit number.

**_Things that still can be improve_**

1. Actual 1:1000 size on the planet that able to showcase to users.
2. Add on information like Orbit velocity & speed
3. Swipe function on mobile for better user experience.