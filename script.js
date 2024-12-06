(function () {
  let container = document.querySelector("#test-parent");
  let allTests;
  let allCourses;

  // all tests
  async function getTests() {
    let rdata = await fetch(
      `https://api.classplusapp.com/v2/course/preview/diy/similar/eyJ0dXRvcklkIjpudWxsLCJvcmdJZCI6Njc5NDE0LCJjYXRlZ29yeUlkIjpudWxsfQ`
    );
    const data = await rdata.json();
    allTests = data.data.all.coursesData;
    allTests.sort((a, b) => b.createdAt - a.createdAt);
    addTest(allTests);
  }
  getTests();

  // all courses
  async function getCourse() {
    let crs = await fetch(
      `https://api.classplusapp.com/v2/course/preview/similar/eyJvcmdJZCI6MTI4Nn0=?tabCategoryId=1&limit=50&offset=0&requiredFilters=[1]`
    );
    const data = await crs.json();
    allCourses = data.data.coursesData;
    allCourses.sort((a, b) => b.createdAt - a.createdAt);
    addCourse(allCourses);
  }
  setTimeout(getCourse, 1000);

  const addTest = (element) => {
    let tests = element;
    for (let i = 0; i < tests.length; i++) {
      //    if(i == 5){
      //     break;
      //    }
      element = tests[i];
      container.innerHTML += `
                <a id= "mainLink" href="${element.singlePaymentLink}">
                <div class="child">
                <div><img src="${element.imageUrl}" alt=""></div>
                <h1>${element.name}</h1>
                <div class="show-price">
                    <span>&#8377; ${element.finalPrice}/-</span>
                    <span>
                        <span> ${element.price} </span>
                        <span> ${
                          ((element.price - element.finalPrice) /
                            element.price) *
                            100 >
                          0
                            ? `${(
                                ((element.price - element.finalPrice) /
                                  element.price) *
                                100
                              ).toFixed(0)}% OFF`
                            : " "
                        } </span>
                    </span>
                </div>               
                <hr class="hr-line">
                 <div class="content">
                    ${
                      element.likes.value != 0
                        ? `<div class="content1">                                
                                <i class="ri-thumb-up-line"></i>
                                <span>Likes : </span>
                                <span>${element.likes.value}</span>
                            </div>`
                        : ""
                    }
                    ${
                      element.resources.files > 0
                        ? `<div class="content1">
                            <i class="ri-file-pdf-2-line"></i>
                            <span>Pdfs : </span>
                            <span>${element.resources.files}</span>
                    </div>`
                        : ""
                    }
                    ${
                      element.resources.tests > 0
                        ? `<div class="content1">
                                <i class="ri-a-b"></i>
                                <span>Tests : </span>
                                <span>${element.resources.tests}</span>
                            </div>`
                        : ""
                    }
                </div>
                <div class="likes">
                
                <div class="course-category">
                    <span>Categories : </span>
                    <span>${element.categories}</span>
                </div>
                <div class="actionbtn">
                    <button class="Buy-btn" onClick="window.location.href='${
                      element.singlePaymentLink
                    }'">Free Demo</button>
                </div>
                
                </div>
             </a>
        `;
    }
  };

  function addCourse(element) {
    let courses = element;
    for (let i = 0; i < courses.length; i++) {
      element = courses[i];
      container.innerHTML += `
            <a id= "mainLink" href="${element.singlePaymentLink}">
            <div class="child">
            <div><img src="${element.imageUrl}" alt=""></div>
            <h1>${element.name}</h1>
            <div class="show-price">
                <span>&#8377; ${element.finalPrice}/-</span>
                <span>
                    <span> ${element.price} </span>
                    <span> ${
                      ((element.price - element.finalPrice) / element.price) *
                        100 >
                      0
                        ? `${(
                            ((element.price - element.finalPrice) /
                              element.price) *
                            100
                          ).toFixed(0)}% OFF`
                        : " "
                    } </span>
                </span>
            </div>           
            <hr class="hr-line">
             <div class="content">
                ${
                  element.likes.value != 0
                    ? `<div class="content1">                                    
                            <i class="ri-thumb-up-line"></i>
                            <span>Likes : </span>
                            <span>${element.likes.value}</span>
                        </div>`
                    : ""
                }
                ${
                  element.resources.files > 0
                    ? `<div class="content1">
                        <i class="ri-file-pdf-2-line"></i>
                        <span>Pdfs : </span>
                        <span>${element.resources.files}</span>
                </div>`
                    : ""
                }
                ${
                  element.resources.tests > 0
                    ? `<div class="content1">
                            <i class="ri-a-b"></i>
                            <span>Tests : </span>
                            <span>${element.resources.tests}</span>
                        </div>`
                    : ""
                }
            </div>
            <div class="likes">
            
            <div class="course-category">
                <span>Categories : </span>
                <span>${element.categories}</span>
            </div>
            <div class="actionbtn">
                <button class="Buy-btn" onClick="window.location.href='${
                  element.singlePaymentLink
                }'">Free Demo</button>
            </div>
            
            </div>
         </a>
    `;
    }
  }
})();
