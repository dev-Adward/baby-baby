  // const inputField = document.querySelector('.chosen-value');
  // const dropdown = document.querySelector('.value-list');
  // const dropdownArray = [... document.querySelectorAll('li')];
  // console.log(typeof dropdownArray)
  // dropdown.classList.add('open');
  // inputField.focus(); // Demo purposes only
  // let valueArray = [];
  // dropdownArray.forEach(item => {
  //   valueArray.push(item.textContent);
  // });
  //
  // const closeDropdown = () => {
  //   dropdown.classList.remove('open');
  // }
  //
  // inputField.addEventListener('input', () => {
  //   dropdown.classList.add('open');
  //   let inputValue = inputField.value.toLowerCase();
  //   let valueSubstring;
  //   if (inputValue.length > 0) {
  //     for (let j = 0; j < valueArray.length; j++) {
  //       if (!(inputValue.substring(0, inputValue.length) === valueArray[j].substring(0, inputValue.length).toLowerCase())) {
  //         dropdownArray[j].classList.add('closed');
  //       } else {
  //         dropdownArray[j].classList.remove('closed');
  //       }
  //     }
  //   } else {
  //     for (let i = 0; i < dropdownArray.length; i++) {
  //       dropdownArray[i].classList.remove('closed');
  //     }
  //   }
  // });
  //
  // dropdownArray.forEach(item => {
  //   item.addEventListener('click', (evt) => {
  //     inputField.value = item.textContent;
  //     dropdownArray.forEach(dropdown => {
  //       dropdown.classList.add('closed');
  //     });
  //   });
  // })
  //
  // inputField.addEventListener('focus', () => {
  //    inputField.placeholder = 'Type to filter';
  //    dropdown.classList.add('open');
  //    dropdownArray.forEach(dropdown => {
  //      dropdown.classList.remove('closed');
  //    });
  // });
  //
  // inputField.addEventListener('blur', () => {
  //    inputField.placeholder = 'Select state';
  //   dropdown.classList.remove('open');
  // });
  //
  // document.addEventListener('click', (evt) => {
  //   const isDropdown = dropdown.contains(evt.target);
  //   const isInput = inputField.contains(evt.target);
  //   if (!isDropdown && !isInput) {
  //     dropdown.classList.remove('open');
  //   }
  // });
  //


  let page = 0;
  const boardService = (() => {
    function getList(callback){
      $.ajax({
        url: `/mypage/payment/${page}`,
        type: 'post',
        data: JSON.stringify({page:page}),
        contentType: "application/json;charset=utf-8",
        success: function(purchaseDTOS){
          console.log("들어왓다")
          if (purchaseDTOS.length === 0) { // 불러올 데이터가 없으면
            console.log("막힘")
            $(window).off('scroll'); // 스크롤 이벤트를 막음
            return;
          }
          if(callback){
            callback(purchaseDTOS);
            console.log("들어왓다")
          }
        }
      });
      page++;
    }
    return {getList: getList};
  })();

  function appendList(purchaseDTOS) {
    let boardText3 = '';
    console.log(purchaseDTOS.content);
    purchaseDTOS.content.forEach(purchase => {
      console.log(purchaseDTOS);
      let date = new Date(purchase.purchaseRegisterDate); // assuming eventLike.registerDate is a valid date string
      let formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');

      boardText3 +=  `
                                         <li class="one-list">
                                <div class="list-inner">
                                <dl class="order-info">
                                <dt>주문번호</dt>
                                <dd>230426-174637-0001</dd>
                                <dt>주문 일자</dt>
                            <dd style="text-align: right;">${formattedDate}</dd>
                            </dl>
                            
                            <div class="product-info">
                            
                                <div class="product-thumb-area">
                                <img src="https://cdn2.wadiz.kr/2023/04/25/f6a525c2-d0c8-469c-a820-f0a7289d9ab4.png/wadiz/resize/400/format/jpg/quality/85/" alt="">
                                </div>
                            
                                <dl class="product-info">
                                <dt class="product-name" style="display:none">상품명</dt>
                                <dd>
                                "${purchase.eventTitle}"
                                </dd>
                                </dl>
                                <div class="more-info">
                                <span>${purchase.memberName}</span>
                                <span class="more-text">상세 보기 <span class="more-text-icon"> > </span></span>
                            </div>
                            
                            </div>
                            
                            
                            </div>
                            </li>
                          `
      ;
    });
    if (purchaseDTOS.length === 0) { // 불러올 데이터가 없으면
      $(window).off('scroll'); // 스크롤이벤트 x
    }
    $('.order-lists').append(boardText3);
  }

  boardService.getList(function(purchaseDTOS) {
    page = 0;
    console.log(purchaseDTOS.content);
    appendList(purchaseDTOS);
    console.log(page + "페이지 로딩 시 초기화면")
  });

  console.log("sadasdasd");

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() * 0.9) {
      page++;
      boardService.getList(appendList);
      console.log(page)
    }
  });



  /*-----------*/














