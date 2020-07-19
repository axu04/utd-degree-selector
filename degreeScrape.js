//File that contains script to get degree requirement data using puppeteer
//Last Edit: Alec Xu -- July 19

const puppeteer = require('puppeteer')
const apis = require('./api')

async function scrapeDegrees(url) {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url)
        const requirements = []
        var counter = 6
        const degreeTitle = '' /* <--- DEGREE NAME HERE*/
        const twoNums = []
        const threeNums = []
        const ignore = []
        const twoDigit = []
        const twoNumsButLarge = []
        const diffType = []
        for (let i = 111; i < 192; i++) {
                if (i === 189) {
                        continue
                }
                const [courseRequirements] = await page.$x(`/html/body/div[1]/div[1]/article/div[1]/p[${i}]`)
                const courseRequirementsTxt = await courseRequirements.getProperty('textContent')
                var courseReqFinal = await courseRequirementsTxt.jsonValue()

                var lastChar = courseReqFinal[courseReqFinal.length-1]

                if (ignore.indexOf(i) !== -1) {
                        console.log('skipping')
                }
                else if (twoNumsButLarge.indexOf(i) !== -1) {
                        courseReqFinal = courseReqFinal.slice(0, courseReqFinal.length-5)
                }
                else if (twoDigit.indexOf(i) !== -1) {
                        courseReqFinal = courseReqFinal.slice(0, courseReqFinal.length-2)
                }
                else if (twoNums.indexOf(i) !== -1) {
                        courseReqFinal = courseReqFinal.slice(0, courseReqFinal.length-4)
                }
                else if (threeNums.indexOf(i) !== -1) {
                        courseReqFinal = courseReqFinal.slice(0, courseReqFinal.length-7)
                }
                else if (isCharNumber(lastChar)) {
                        courseReqFinal = courseReqFinal.slice(0, courseReqFinal.length-1)
                }

                const className = await courseRequirements.getProperty('className')
                var classNameObj = await className.jsonValue()
                var id = await className.jsonValue()
                classNameObj = classNameObj.slice(0, 8)
                id = id.slice(id.length-6, id.length)

                requirements.push([courseReqFinal, classNameObj, id])   
                
                if (diffType.indexOf(i) !== -1) {
                        const [courseRequirements] = await page.$x(`/html/body/div[1]/div[1]/article/div[1]/h3[${counter}]`)
                        const courseRequirementsTxt = await courseRequirements.getProperty('textContent')
                        var courseReqFinal = await courseRequirementsTxt.jsonValue()

                        var lastChar = courseReqFinal[courseReqFinal.length-1]

                        if (isCharNumber(lastChar)) {
                                courseReqFinal = courseReqFinal.slice(0, courseReqFinal.length-1)
                        }
                
                        const className = await courseRequirements.getProperty('className')
                        var classNameObj = await className.jsonValue()
                        var id = await className.jsonValue()
                        classNameObj = classNameObj.slice(0, 8)
                        id = id.slice(id.length-6, id.length)

                        requirements.push([courseReqFinal, classNameObj, id])
                        counter++
                }
        }
        const degreeData = requirements
        apis.insertDegree({ degreeTitle, degreeData })
        console.log('Inserted')
}

function isCharNumber(character){
        return character >= '0' && character <= '9';
}

async function deleteAllDegrees() {
        const allDegrees = await apis.getAllDegrees()
        for (let i = 0; i < allDegrees.data.length; i++) {
                apis.deleteDegree(allDegrees.data[i].degreeTitle)
        }
}

async function deleteDegree() {
        await apis.deleteDegree('**DEGREE NAME HERE**')
}

// deleteDegree()

// changeData()

// scrapeDegrees('https://catalog.utdallas.edu/2020/undergraduate/programs/nsm/')
// deleteAllDegrees()


