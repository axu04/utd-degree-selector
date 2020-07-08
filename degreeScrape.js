const puppeteer = require('puppeteer')
const apis = require('./api')

async function scrapeDegrees(url) {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url)
        const requirements = []
        var counter = 1
        // var bigCounter = 1
        const degreeTitle = 'Bachelor of Arts in test'
        const twoNums = []
        const threeNums = []
        const ignore = []
        const diffType = [60, 64]
        // const bigDiffType = [42, 66, 71];
        const twoDigit = []
        const tooManyDigits = []
        for (let i = 14; i < 182; i++) {
                const [courseRequirements] = await page.$x(`/html/body/div[1]/div[1]/article/div[1]/p[${i}]`)
                const courseRequirementsTxt = await courseRequirements.getProperty('textContent')
                var courseReqFinal = await courseRequirementsTxt.jsonValue()

                var lastChar = courseReqFinal[courseReqFinal.length-1]

                if (ignore.indexOf(i) !== -1) {
                        console.log('skipping')
                }
                else if (twoDigit.indexOf(i) !== -1) {
                        courseReqFinal = courseReqFinal.slice(0, courseReqFinal.length-2)
                }
                else if (tooManyDigits.indexOf(i) !== -1) {
                        courseReqFinal = courseReqFinal.slice(0, courseReqFinal.length-5)
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

                if (i === 25 || i === 40) {
                        courseReqFinal = courseReqFinal.replace('Calculus3', 'Calculus')
                }

                const className = await courseRequirements.getProperty('className')
                var classNameObj = await className.jsonValue()
                var id = await className.jsonValue()
                classNameObj = classNameObj.slice(0, 8)
                id = id.slice(id.length-6, id.length)

                requirements.push([courseReqFinal, classNameObj, id])   
                
                if (diffType.indexOf(i) !== -1) {
                        const [courseRequirements] = await page.$x(`/html/body/div[1]/div[1]/article/div[1]/h5[${counter}]`)
                        const courseRequirementsTxt = await courseRequirements.getProperty('textContent')
                        var courseReqFinal = await courseRequirementsTxt.jsonValue()

                        var lastChar = courseReqFinal[courseReqFinal.length-1]

                        if (twoNums.indexOf(i) !== -1) {
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
                        counter++
                }

                // if (bigDiffType.indexOf(i) !== -1) {
                //         const [courseRequirements] = await page.$x(`/html/body/div[1]/div[1]/article/div[1]/h4[${bigCounter}]`)
                //         const courseRequirementsTxt = await courseRequirements.getProperty('textContent')
                //         var courseReqFinal = await courseRequirementsTxt.jsonValue()

                //         var lastChar = courseReqFinal[courseReqFinal.length-1]

                //         if (twoNums.indexOf(i) !== -1) {
                //                 courseReqFinal = courseReqFinal.slice(0, courseReqFinal.length-4)
                //         }
                //         else if (threeNums.indexOf(i) !== -1) {
                //                 courseReqFinal = courseReqFinal.slice(0, courseReqFinal.length-7)
                //         }
                //         else if (isCharNumber(lastChar)) {
                //                 courseReqFinal = courseReqFinal.slice(0, courseReqFinal.length-1)
                //         }
                
                //         const className = await courseRequirements.getProperty('className')
                //         var classNameObj = await className.jsonValue()
                //         var id = await className.jsonValue()
                //         classNameObj = classNameObj.slice(0, 8)
                //         id = id.slice(id.length-6, id.length)

                //         requirements.push([courseReqFinal, classNameObj, id])
                //         bigCounter++
                // }

                // if (i === 126) {
                //         const [courseRequirements] = await page.$x(`/html/body/div[1]/div[1]/article/div[1]/ul[2]/li`)
                //         const courseRequirementsTxt = await courseRequirements.getProperty('textContent')
                //         var courseReqFinal = await courseRequirementsTxt.jsonValue()

                //         var lastChar = courseReqFinal[courseReqFinal.length-1]

                //         if (twoNums.indexOf(i) !== -1) {
                //                 courseReqFinal = courseReqFinal.slice(0, courseReqFinal.length-4)
                //         }
                //         else if (threeNums.indexOf(i) !== -1) {
                //                 courseReqFinal = courseReqFinal.slice(0, courseReqFinal.length-7)
                //         }
                //         else if (isCharNumber(lastChar)) {
                //                 courseReqFinal = courseReqFinal.slice(0, courseReqFinal.length-1)
                //         }
                
                //         const className = await courseRequirements.getProperty('className')
                //         var classNameObj = await className.jsonValue()
                //         var id = await className.jsonValue()
                //         classNameObj = classNameObj.slice(0, 8)
                //         id = id.slice(id.length-6, id.length)

                //         requirements.push([courseReqFinal, classNameObj, id])
                // }

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

async function changeData() {
        var dataArray = await apis.getDegreeById('Bachelor of Arts in Biology and Criminology TEMP')
        for (let i = 0; i < dataArray.data.degreeData.length; i++) {
                dataArray.data.degreeData[i][0] = dataArray.data.degreeData[i][0].replace('Calculus4,', 'Calculus')
                dataArray.data.degreeData[i][0] = dataArray.data.degreeData[i][0].replace('Justice4', 'Justice')
                dataArray.data.degreeData[i][0] = dataArray.data.degreeData[i][0].replace('Criminology4', 'Criminology')
        }
        const degreeData = dataArray.data.degreeData
        console.log(degreeData)
        const degreeTitle = 'Bachelor of Arts in Biology and Criminology'
        apis.insertDegree({ degreeTitle, degreeData })
}

// changeData()

scrapeDegrees('https://catalog.utdallas.edu/2020/undergraduate/programs/atec/arts-and-technology')

// deleteAllDegrees()


