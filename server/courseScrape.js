//courseScrape.js
//File that contains the script to scrape course data using puppeteer

// "Instructor and Associate Dean Consent Required" - NSC 4V91
// "Signature of instructor and secondary reader on proposed project outline required" - VPAS 4V99 
const puppeteer = require('puppeteer')
const apis = require('./api')

//Add "open for good gpa people" - CLDP 4394
//Fix duplicate department consent required - FIN 4380
// fix duplicate instructor consent required - GEOS 4390
// Students must also be enrolled in a 3000 or 4000-level performance ensemble. - MUSI 4V61
async function scrapeWebsite(url, courseTopic) {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url)
        let classes = []
        for (let i = 1; i < 200; i++) {

                const [data] = await page.$x(`/html/body/div[1]/div[1]/article/div[1]/p[${i}]`)
                if (data === undefined) {
                        break
                }
                const dataTxt = await data.getProperty('textContent')
                const courseInfo = await dataTxt.jsonValue()

                const [title] = await page.$x(`/html/body/div[1]/div[1]/article/div[1]/p[${i}]/span[1]`)
                const txt = await title.getProperty('textContent')
                const courseLabel = await txt.jsonValue()

                const [courseName] = await page.$x(`/html/body/div[1]/div[1]/article/div[1]/p[${i}]/span[2]`)
                const courseTxt = await courseName.getProperty('textContent')
                var courseTitle = await courseTxt.jsonValue()

                const [hours] = await page.$x(`/html/body/div[1]/div[1]/article/div[1]/p[${i}]/span[3]`)
                const hoursTxt = await hours.getProperty('textContent')
                var semesterHours = await hoursTxt.jsonValue()

                if (courseTitle.charAt(0) == "(") {

                        const [courseName2] = await page.$x(`/html/body/div[1]/div[1]/article/div[1]/p[${i}]/span[3]`)
                        const courseTxt2 = await courseName2.getProperty('textContent')
                        courseTitle = await courseTxt2.jsonValue()

                        const [hours2] = await page.$x(`/html/body/div[1]/div[1]/article/div[1]/p[${i}]/span[4]`)
                        const hoursTxt2 = await hours2.getProperty('textContent')
                        semesterHours = await hoursTxt2.jsonValue()

                }

                //Get Prerequisites/Corequisites for each class
        
                const prereqRegex = 'Prerequisite[^]*[\.]'
                const coreqRegex = '(Corequisite[^.]*\.)'
                const instructorReq = 'Instructor consent required.'
                const juniorInstructorReq = 'Junior standing and instructor consent required.'
                const recommendedReq = 'Recommended[^.]*\.'
                const programHeadRegex = 'Program Head consent required.'
                const departmentHeadRegex = 'Department consent required.'
                const honorsDirectorRegex = 'Director of the Honors Program consent required.'
                const associateDeanRegex = 'Instructor and Associate Dean consent required.'
                const NSCFacultyRegex = 'UT Dallas NSC faculty consent required.'
                const instructorSigRegex = 'Signature of instructor and secondary reader on proposed project outline required. '
                const musiSigRegex = 'Signature of instructor and Associate Dean on proposed project outline required.'
                const ensembleRegex = 'Students must also be enrolled in a 3000 or 4000-level performance ensemble.'

                var requirements = ''
                var prereqMatch = courseInfo.match(prereqRegex) || ['']
                var coreqMatch = courseInfo.match(coreqRegex) || ['']
                var recommendedMatch = courseInfo.match(recommendedReq) || ['']
                var juniorInstructorMatch = courseInfo.match(juniorInstructorReq) || ['']
                var instructorMatch = courseInfo.match(instructorReq) || ['']
                var programHeadMatch = courseInfo.match(programHeadRegex) || ['']
                var departmentHeadMatch = courseInfo.match(departmentHeadRegex) || ['']
                var honorsDirectorMatch = courseInfo.match(honorsDirectorRegex) || ['']
                var associateDeanMatch = courseInfo.match(associateDeanRegex) || ['']
                var NSCFacultyMatch = courseInfo.match(NSCFacultyRegex) || ['']
                var instructorSigMatch = courseInfo.match(instructorSigRegex) || ['']
                var musiSigMatch = courseInfo.match(musiSigRegex) || ['']
                var ensembleMatch = courseInfo.match(ensembleRegex) || ['']

                requirements = requirements.concat(prereqMatch[0])
                if (prereqMatch[0] !== '') {
                        requirements = requirements.concat(' ')
                }
                requirements = requirements.concat(recommendedMatch[0])
                if (recommendedMatch[0] !== '') {
                        requirements = requirements.concat(' ')
                }
                if (requirements === '') {
                        requirements = requirements.concat(coreqMatch[0])
                        if (coreqMatch[0] !== '') {
                                requirements = requirements.concat(' ')
                        }
                }
                requirements = requirements.concat(juniorInstructorMatch[0])
                if (juniorInstructorMatch[0] !== '') {
                        requirements = requirements.concat(' ')
                }
                requirements = requirements.concat(instructorMatch[0])
                if (instructorMatch[0] !== '') {
                        requirements = requirements.concat(' ')
                }
                requirements = requirements.concat(programHeadMatch[0])
                if (programHeadMatch[0] !== '') {
                        requirements = requirements.concat(' ')
                }
                requirements = requirements.concat(departmentHeadMatch[0])
                if (departmentHeadMatch[0] !== '') {
                        requirements = requirements.concat(' ')
                }
                requirements = requirements.concat(honorsDirectorMatch[0])
                if (honorsDirectorMatch[0] !== '') {
                        requirements = requirements.concat(' ')
                }
                requirements = requirements.concat(associateDeanMatch[0])
                if (associateDeanMatch[0] !== '') {
                        requirements = requirements.concat(' ')
                }
                requirements = requirements.concat(NSCFacultyMatch[0])
                if (NSCFacultyMatch[0] !== '') {
                        requirements = requirements.concat(' ')
                }
                requirements = requirements.concat(instructorSigMatch[0])
                if (instructorSigMatch[0] !== '') {
                        requirements = requirements.concat(' ')
                }
                if (musiSigMatch[0] !== '') {
                        requirements = requirements.concat(' ')
                }
                if (ensembleMatch[0] !== '') {
                        requirements = requirements.concat(' ')
                }

                if (requirements === '') {
                        requirements = 'None'
                }

                apis.insertCourse({ courseLabel, courseTitle, courseTopic, semesterHours, requirements })
                
        }
        console.log('inserted')
        console.log(url)
}

async function deleteAllCourses() {
        const allCourses = await apis.getAllCourses()
        for (let i = 0; i < allCourses.data.length; i++) {
                apis.deleteCourse(allCourses.data[i].courseLabel)
        }
}

async function getCourseList(url) {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url)
        var courses = []
        for (let i = 1; i < 200; i++) {
                const [data] = await page.$x(`/html/body/div[1]/div[1]/article/div[1]/table/tbody/tr[${i}]/td[1]/a`)
                if (data === undefined) {
                        break
                }
                const dataTxt = await data.getProperty('textContent')
                const courseInfo = await dataTxt.jsonValue()
                courses.push(courseInfo)
        }
        return courses
}

async function insertAllCourses() {
        const courseList = await getCourseList('https://catalog.utdallas.edu/2020/undergraduate/courses')
        let name = ''
        for (let i = 0; i < 97; i++) {
                await scrapeWebsite(`https://catalog.utdallas.edu/2020/undergraduate/courses/${courseList[i]}`, courseList[i])
        }
        console.log('completed')
}

insertAllCourses()
// deleteAllCourses()