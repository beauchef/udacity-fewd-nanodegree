/**
 *
 * Jean-François Beauchef
 *
 * Udacity P2: Online Resume
 *
 */


/**
 * Get HTML template bit with data passed
 *
 * @param htmlString HTML template bit
 * @param data string to replace %data% plateholder
 * @returns {string}
 */
function getHtmlWithData(htmlString, data) {
    return htmlString.replace('%data%', data)
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
    var plaintextData = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var encryptedData = reverseString(plaintextData);
    var output = "";
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
        location: 'Montreal area, Canada'
    },
    welcomeMessage: 'Welcome!',
    skills: ['Java and JEE', 'Spring Framework', 'Multiple SQL flavours', 'JavaScript and AngularJS'],
    biopic: 'https://secure.gravatar.com/avatar/1b049d885372906fa2014734c34e375e', // yes I know, not a very good pic
    display: function() {
        $('#header').prepend(getHtmlWithData(HTMLheaderRole, this.role));
        $('#header').prepend(getHtmlWithData(HTMLheaderName, this.name));
        for (var contactType of Object.keys(this.contacts)) {
            $('#topContacts').append(getHtmlWithData(HTMLcontactGeneric, this.contacts[contactType]).replace('%contact%', contactType));
        }
        $('#header').append(getHtmlWithData(HTMLbioPic, this.biopic));
        $('#header').append(getHtmlWithData(HTMLwelcomeMsg, this.welcomeMessage));
        $('#header').append(HTMLskillsStart);
        for (var skill of this.skills) {
            $('#skills').append(getHtmlWithData(HTMLskills, skill));
        }
    }
}

/**
 * Education
 *
 * @type {{schools: *[], onlineCourses: *[], display: education.'display'}}
 */
var education = {
    'schools': [
        {
            'name': 'University of Montreal',
            'location': 'Montreal, Canada',
            'degree': 'Bachelor',
            'majors': 'Computer Science',
            'dates': 1998,
            'url': 'http://www.umontreal.ca/'
        }
    ],
    'onlineCourses': [
        {
            'title': 'Cryptography',
            'school': 'Coursera (University of Maryland)',
            'date': 2015,
            'url': 'https://www.coursera.org/account/accomplishments/verify/2YXETNF4BA'
        }
    ],
    'display': function() {
        // TODO
    }
}

/**
 * Work experience
 *
 * @type {{jobs: *[], display: work.'display'}}
 */
var work = {
    'jobs': [
        {
            'employer': 'Logient',
            'title': 'Senior Web Developer',
            'location': 'Montreal, Canada',
            'dates': 'From March 2014',
            'description': 'Java, J2EE, Tomcat, JPA, Hibernate, PostgreSQL, Spring, Spring Data, Spring MVC, Spring Security, Maven, Grails, JavaScript, AngularJS, jQuery, NodeJS, Grunt, Bower'
        },
        {
            'employer': 'Infinite Game Publishing',
            'title': 'Senior Web Developer',
            'location': 'Montreal, Canada',
            'dates': 'December 2011 - January 2014',
            'description': 'Work on the game portal for Sins of a Dark Age by IronClad. Work on the game portal for Mech Warrior Tactics. Integration with PlaySpan (payment), ZenDesk (support), IPBoard (forums), and games. Web services in Java.'
        },
        {
            'employer': 'Axa Canada (now Intact Insurance)',
            'title': 'Programmer Analyst',
            'location': 'Montreal, Canada',
            'dates': 'February 2008 - December 2011',
            'description': 'Web development (J2EE, Spring, JSF), Web Services.'
        },
        {
            'employer': 'Standard Life Canada (now ManuLife)',
            'title': 'Programmer Analyst',
            'location': 'Montreal, Canada',
            'dates': 'January 2002 - February 2008',
            'description': 'Web developpment (J2EE), Support, ETLs (DataJunction).'
        },
        {
            'employer': 'Nortel Networks',
            'title': 'Programmer Analyst',
            'location': 'Montreal, Canada',
            'dates': 'July 2000 - December 2001',
            'description': 'C++ development on an application to manage a big telecomm network.'
        },
        {
            'employer': 'Surf\'n Shop',
            'title': 'Programmer Analyst',
            'location': 'Montreal, Canada',
            'dates': 'February 2000 - July 2000',
            'description': 'Web development for transactional web sites. C++ and Jasmine. UML modeling with MagicDraw.'
        },
        {
            'employer': 'Microcell Telecomm (now Rogers)',
            'title': 'Programmer Analyst',
            'location': 'Montreal, Canada',
            'dates': 'January 1998 - February 2000',
            'description': 'C++ and some Java. Billing application and Customer Service application.'
        }
    ],
    'display': function() {
        for (var job of this.jobs) {
            $('#workExperience').append(HTMLworkStart);
            $('.work-entry:last').append(getHtmlWithData(HTMLworkEmployer, job.employer));
            $('.work-entry:last').append(getHtmlWithData(HTMLworkTitle, job.title));
            $('.work-entry:last').append(getHtmlWithData(HTMLworkDates, job.dates));
            $('.work-entry:last').append(getHtmlWithData(HTMLworkLocation, job.location));
            $('.work-entry:last').append(getHtmlWithData(HTMLworkDescription, job.description));
        }
    }
}

/**
 * Projects
 *
 * @type {{schools: *[], display: projects.'display'}}
 */
var projects = {
    'schools': [
        {
            'title': 'My fictional project',
            'dates': 2015,
            'description': 'A project about great things',
            'images': ['http://www.example.com/image1.jpg', 'http://www.example.com/image2.jpg']
        }
    ],
    'display': function() {
        // TODO
    }
}



/**
 * Display resume
 */
bio.display();
education.display();
work.display();
projects.display();
