/**
 *
 * Jean-François Beauchef
 *
 * Udacity P2: Online Resume
 *
 * I added some "url" fields in some of the objects below, so the links work.
 * But besides that, the objects follow the required schema.
 *
 * TODO:
 * - Review Udacity style guide
 *
 */



var OPEN_WEATHER_API_KEY = '3e7fc8acf298aa1bd69956e9724bbe5d'; // My own personal Open Weather API key. :)



/**
 * Get HTML template bit with data passed
 *
 * @param htmlString HTML template bit
 * @param data string to replace %data% placeholder
 * @returns {string}
 */
function getHtmlWithData(htmlString, data) {
    return htmlString.replace('%data%', data)
}

/**
 * Get HTML template bit with data and URL passed
 *
 * @param htmlString HTML template bit
 * @param data string to replace %data% placeholder
 * @param href URL to replace the pound sign
 * @returns {string}
 */
function getHtmlWithDataAndHref(htmlString, data, href) {
    return htmlString.replace('%data%', data).replace('#', href);
}

/**
 * Convert degrees from kelvin to celcius
 *
 * @param degrees in kelvin
 * @param decimals
 * @returns {string}
 */
function convertKelvinToCelcius(degrees, decimals) {
    decimals = ((decimals === undefined) || (decimals !== parseInt(decimals, 10))) ? 0 : decimals;
    var result = degrees - 273.15;
    return result.toFixed(decimals);
}

/**
 * Convert degrees from kelvin to fahrenheit
 *
 * @param degrees in kelvin
 * @param decimals
 * @returns {string}
 */
function convertKelvinToFahrenheit(degrees, decimals) {
    decimals = ((decimals === undefined) || (decimals !== parseInt(decimals, 10))) ? 0 : decimals;
    var result = ((degrees * 9) / 5) - 459.67;
    return result.toFixed(decimals);
}

/**
 * Reverse the content of a string
 *
 * @param input string to be reversed
 * @returns {string}
 */
function reverseString(input) {
    input = input || '';
    var output ='';
    for (var i = input.length-1; i >= 0; i--) {
        output += input.charAt(i);
    }
    return output;
}

/**
 * Decrypt a string using a simple algorithm.
 * Each character of the plaintextData variable is matched with a character of encryptedData.
 * The encryptedData variable is simply the reverse of plaintextData ('abcd' -> 'dcba')
 * Characters not found in encryptedData, are returned as-is.
 * That way, a simple BOT cannot find encrypted email addresses.
 * This is a very simple spam protection.
 *
 * @param input encrypted value
 * @returns {string}
 */
function decrypt(input) {
    var plaintextData = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var encryptedData = reverseString(plaintextData);
    var output = '';
    var position = 0;
    while (position < input.length) {
        if (encryptedData.indexOf(input.charAt(position)) > 0) {
            output += plaintextData.charAt(encryptedData.indexOf(input.charAt(position)));
        } else {
            output += input.charAt(position);
        }
        position++;
    }
    return output;
}

/**
 * Bio data (header)
 *
 * @type {{name: string, role: string, contacts: *[], welcomeMessage: string, skills: string[], biopic: string, display: bio.'display'}}
 */
var bio = {
    name: 'Jean-François Beauchef',
    role: 'Web Developer',
    contacts: {
        mobile: '438-390-0252',
        email: decrypt('afjW-eSjWhVbR@ifjPhcfe.hVX'),
        github: 'beauchef',
        twitter: '@jf_beauchef',
        location: 'St-Lambert, Canada'
    },
    welcomeMessage: 'Lorem ipsum dolor sit amet, mel ne illum eligendi perfecto, deleniti mediocritatem duo ut, ei duo tamquam dolorem deleniti. Eos timeam equidem necessitatibus ut. Nominavi voluptaria usu at, ex mel natum populo graeco. Et usu dolor debitis.',
    skills: [
        'Java and JEE', 'Spring Framework', 'Multiple SQL flavours', 'JavaScript and AngularJS'
    ],
    biopic: 'https://secure.gravatar.com/avatar/1b049d885372906fa2014734c34e375e',
    display: function() {
        $('#header').prepend(getHtmlWithData(HTMLheaderRole, this.role));
        $('#header').prepend(getHtmlWithData(HTMLheaderName, this.name));
        for (var contactType of Object.keys(this.contacts)) {
            var contact = getHtmlWithData(HTMLcontactGeneric, this.contacts[contactType]).replace('%contact%', contactType);
            $('#topContacts').append(contact);
            $('#footerContacts').append(contact);
        }
        $('#header').append(getHtmlWithData(HTMLbioPic, this.biopic));
        $('#header').append(HTMLskillsStart);
        for (var skill of this.skills) {
            $('#skills').append(getHtmlWithData(HTMLskills, skill));
        }
        $('#header').append(getHtmlWithData(HTMLwelcomeMsg, this.welcomeMessage));
    }
};

/**
 * Education
 *
 * @type {{schools: *[], onlineCourses: *[], display: education.'display'}}
 */
var education = {
    schools: [
        {
            name: 'University of Sherbrooke',
            location: 'University of Sherbrooke, Longueuil, Canada',
            degree: 'Short graduate program',
            majors: 'Computer Security',
            dates: 2017,
            url: 'http://www.usherbrooke.ca/'
        },
        {
            name: 'University of Sherbrooke',
            location: 'University of Sherbrooke, Longueuil, Canada',
            degree: 'Short graduate program',
            majors: 'Ethics',
            dates: 2017,
            url: 'http://www.usherbrooke.ca/'
        },
        {
            name: 'University of Sherbrooke',
            location: 'University of Sherbrooke, Longueuil, Canada',
            degree: 'DESS (2nd cycle diploma)',
            majors: 'Information Technology',
            dates: 2006,
            url: 'http://www.usherbrooke.ca/'
        },
        {
            name: 'University of Montreal',
            location: 'University of Montreal, Montreal, Canada',
            degree: 'Bachelor',
            majors: 'Computer Science',
            dates: 1998,
            url: 'http://www.umontreal.ca/'
        }
    ],
    onlineCourses: [
        {
            title: 'Cryptography',
            school: 'Coursera (University of Maryland)',
            date: 2015,
            url: 'https://www.coursera.org/account/accomplishments/verify/2YXETNF4BA'
        },
        {
            title: 'Malicious Software and its Underground Economy: Two Sides to Every Story',
            school: 'Coursera (University of London)',
            date: 2015,
            url: 'https://www.coursera.org/account/accomplishments/verify/C3XTJQWYB9'
        }
    ],
    display: function() {
        for (var school of this.schools) {
            $('#education').append(HTMLschoolStart);
            var schoolLink = getHtmlWithDataAndHref(HTMLschoolName, school.name, school.url) +
                getHtmlWithData(HTMLschoolDegree, school.degree);
            $('.education-entry:last').append(schoolLink);
            $('.education-entry:last').append(getHtmlWithData(HTMLschoolDates, school.dates));
            $('.education-entry:last').append(getHtmlWithData(HTMLschoolLocation, school.location));
            $('.education-entry:last').append(getHtmlWithData(HTMLschoolMajor, school.majors));
        }
        $('#education').append(HTMLonlineClasses);
        for (var course of this.onlineCourses) {
            $('#education').append(HTMLschoolStart);
            var courseLink = getHtmlWithDataAndHref(HTMLonlineTitle, course.title, course.url) +
                    getHtmlWithData(HTMLonlineSchool, course.school);
            $('.education-entry:last').append(courseLink);
            $('.education-entry:last').append(getHtmlWithData(HTMLonlineDates, course.date));
        }
    }
};

/**
 * Work experience
 *
 * @type {{jobs: *[], display: work.'display'}}
 */
var work = {
    jobs: [
        {
            employer: 'Logient',
            url: 'http://logient.com/',
            title: 'Senior Web Developer',
            location: '1121, Sainte-Catherine West, Montreal, Canada',
            dates: 'From March 2014',
            description: 'Java, J2EE, Tomcat, JPA, Hibernate, PostgreSQL, Spring, Spring Data, Spring MVC, Spring Security, Maven, Grails, JavaScript, AngularJS, jQuery, NodeJS, Grunt, Bower'
        },
        {
            employer: 'Infinite Game Publishing',
            url: 'https://www.linkedin.com/company/infinite-game-publishing',
            title: 'Senior Web Developer',
            location: '2121 Drummond, Montreal, Canada',
            dates: 'December 2011 - January 2014',
            description: 'Work on the game portal for Sins of a Dark Age by IronClad. Work on the game portal for Mech Warrior Tactics. Integration with PlaySpan (payment), ZenDesk (support), IPBoard (forums), and games. Web services in Java.'
        },
        {
            employer: 'Axa Canada (now Intact Insurance)',
            url: 'https://www.intact.ca/',
            title: 'Programmer Analyst',
            location: '2020 University, Montreal, Canada',
            dates: 'February 2008 - December 2011',
            description: 'Web development (J2EE, Spring, JSF), Web Services.'
        },
        {
            employer: 'Standard Life Canada (now ManuLife)',
            url: 'http://www.standardlife.ca/',
            title: 'Programmer Analyst',
            location: '1250 Sherbrooke West, Montreal, Canada',
            dates: 'January 2002 - February 2008',
            description: 'Web developpment (J2EE), Support, ETLs (DataJunction).'
        },
        {
            employer: 'Nortel Networks',
            url: 'https://en.wikipedia.org/wiki/Nortel',
            title: 'Programmer Analyst',
            location: '2351 Alfred-Nobel, Saint-Laurent, Canada',
            dates: 'July 2000 - December 2001',
            description: 'C++ development on an application to manage a big telecomm network.'
        },
        {
            employer: 'Surf\'n Shop',
            url: 'https://www.linkedin.com/vsearch/p?company=Surf%27n+Shop&trk=prof-exp-company-name',
            title: 'Programmer Analyst',
            location: 'Tour de la bourse, Montreal, Canada',
            dates: 'February 2000 - July 2000',
            description: 'Web development for transactional web sites. C++ and Jasmine. UML modeling with MagicDraw.'
        },
        {
            employer: 'Microcell Telecomm (now Rogers)',
            url: 'https://www.rogers.com/',
            title: 'Programmer Analyst',
            location: '1250 René-Lévesque Ouest, Montreal, Canada',
            dates: 'January 1998 - February 2000',
            description: 'C++ and some Java. Billing application and Customer Service application.'
        }
    ],
    display: function() {
        for (var job of this.jobs) {
            $('#workExperience').append(HTMLworkStart);
            var jobLink = getHtmlWithDataAndHref(HTMLworkEmployer, job.employer, job.url) +
                getHtmlWithData(HTMLworkTitle, job.title);
            $('.work-entry:last').append(jobLink);
            $('.work-entry:last').append(getHtmlWithData(HTMLworkLocation, job.location));
            $('.work-entry:last').append(getHtmlWithData(HTMLworkDates, job.dates));
            $('.work-entry:last').append(getHtmlWithData(HTMLworkDescription, job.description));
        }
    }
};

/**
 * Projects
 *
 * @type {{schools: *[], display: projects.'display'}}
 */
var projects = {
    projects: [
        {
            title: 'My personal web site',
            url: 'http://jean-francois.beauchef.com/',
            dates: 2015,
            description: 'My own web site, written originally in PHP using Symfony, but that will change.',
            images: []
        },
        {
            title: 'My GitHub page',
            url: 'http://beauchef.github.io/',
            dates: 2015,
            description: 'A project about great things',
            images: ['http://lorempixel.com/g/1140/350/nature/3/']
        }
    ],
    display: function() {
        for (var project of this.projects) {
            $('#projects').append(HTMLprojectStart);
            $('.project-entry:last').append(getHtmlWithDataAndHref(HTMLprojectTitle, project.title, project.url));
            $('.project-entry:last').append(getHtmlWithData(HTMLprojectDates, project.dates));
            $('.project-entry:last').append(getHtmlWithData(HTMLprojectDescription, project.description));
            for (var image of project.images) {
                $('.project-entry:last').append(getHtmlWithData(HTMLprojectImage, image));
            }
        }
    }
};

/**
 * Google map
 *
 * @type {{display: map.display}}
 */
var map = {
    display: function() {
        $('#mapDiv').append(googleMap);
    }
};

/**
 * Current weather in Montreal, Canada.
 *
 * @type {{display: weather.display}}
 */
var weather = {
    display: function() {
        $.get( "http://api.openweathermap.org/data/2.5/weather?q=Montreal,ca&appid=" + OPEN_WEATHER_API_KEY,
            function( data ) {
                var tempCelcius = convertKelvinToCelcius(data.main.temp);
                var tempFahrenheit = convertKelvinToFahrenheit(data.main.temp);
                var weatherIconURL = 'http://openweathermap.org/img/w/'+data.weather[0].icon+'.png';
                $('#currentWeather').append(HTMLweatherStart);
                $('.weather').append(getHtmlWithData(HTMLweatherLocation, 'Current weather in ' + data.name + ', ' + data.sys.country));
                $('.weather').append(getHtmlWithData(HTMLweatherTemperature, tempCelcius + ' C / ' + tempFahrenheit + ' F'));
                $('.weather').append(getHtmlWithData(HTMLweatherDescription, data.weather[0].description));
                $('.weather').append(getHtmlWithData(HTMLweatherIcon, weatherIconURL));
            }
        );
    }
}



/**
 * Display resume
 */
bio.display();
weather.display();
education.display();
work.display();
projects.display();
map.display();
