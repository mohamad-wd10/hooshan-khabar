///////////////////////////////////////////// mega-open
function megaOpen() {
  const megaOverlay = document.querySelector('.mega-overlay');
  const resaultBox = document.querySelector('.resault')

  megaOverlay.classList.add('active');
  resaultBox.classList.remove('active');
}

function megaClose() {
  const megaOverlay = document.querySelector('.mega-overlay');

  megaOverlay.classList.remove('active');
}
///////////////////////////////////////////// mega-open

///////////////////////////////////////////// mega menu item hover and click
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('button[data-drop]');
  let activeButton = null;
  let activeDiv = null;

  function activateButtonAndDiv(button, targetDiv) {
    if (activeButton) {
      activeButton.classList.remove('active');
      activeDiv.classList.remove('active');
    }
    button.classList.add('active');
    targetDiv.classList.add('active');
    activeButton = button;
    activeDiv = targetDiv;
  }

  function initializeActiveState() {
    const firstButton = document.querySelector('button[data-drop="category-1"]');
    const firstDiv = document.querySelector('div[data-target="category-1"]');
    if (firstButton && firstDiv) {
      activateButtonAndDiv(firstButton, firstDiv);
    }
  }

  function addEventListeners(button) {
    const targetSelector = `div[data-target="${button.getAttribute('data-drop')}"]`;
    const targetDiv = document.querySelector(targetSelector);

    button.addEventListener('click', () => {
      activateButtonAndDiv(button, targetDiv);
    });

    button.addEventListener('mouseenter', () => {
      if (window.innerWidth > 750) {
        activateButtonAndDiv(button, targetDiv);
      }
    });
  }

  buttons.forEach(button => {
    addEventListeners(button);
  });

  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 750;
    buttons.forEach(button => {
      button.removeEventListener('click', () => { });
      button.removeEventListener('mouseenter', () => { });

      addEventListeners(button);
    });
  });

  initializeActiveState(); // Initialize with the first button and div active
});
///////////////////////////////////////////// mega menu item hover and click

//////////////////////////////////////////////////////// scroll to top btn
let btnTop = document.getElementById("top_sc");
function topSite() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//////////////////////////////////////////////////////// scroll to top btn

///////////////////////////////////////////// switch theme
const body = document.body;
let buttons = document.querySelectorAll(".btn-theme");

// Check if user's preference is stored in local storage
let userTheme = localStorage.getItem("theme");

if (!userTheme) {
  userTheme = "darkModeBtn";
}

const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function switchActiveButton(activeTheme) {
  let oppositeTheme;

  // تعیین تم مخالف
  if (activeTheme === "lightModeBtn") {
    oppositeTheme = "darkModeBtn";
  } else if (activeTheme === "darkModeBtn") {
    oppositeTheme = "lightModeBtn";
  } else {
    // حالت دیفالت → همون تم سیستم
    oppositeTheme = darkModeMediaQuery.matches ? "lightModeBtn" : "darkModeBtn";
  }

  // فعال کردن دکمه مخالف
  buttons.forEach(button => {
    if (button.dataset.theme === oppositeTheme) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  // اعمال همون activeTheme روی body (تم اصلی)
  body.className = activeTheme;
  localStorage.setItem("theme", activeTheme);
}

function toggleThemeBasedOnSystem() {
  const activeTheme = darkModeMediaQuery.matches ? "darkModeBtn" : "lightModeBtn";
  switchActiveButton(activeTheme);
}

darkModeMediaQuery.addEventListener("change", toggleThemeBasedOnSystem);

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const theme = button.dataset.theme;
    switchActiveButton(theme);
  });
});

// Apply user's preferred theme
switchActiveButton(userTheme);
///////////////////////////////////////////// switch theme


//////////////////////////////////////////////////////// search site
const searchFocus = document.getElementById('search-site')
const resaultBox = document.querySelector('.resault')

if (searchFocus && resaultBox) {
  searchFocus.addEventListener('focusin', function () {
    resaultBox.classList.add('active');
  });

  searchFocus.addEventListener('focus', function (event) {
    if (!event.relatedTarget || !resaultBox.contains(event.relatedTarget)) {
      resaultBox.classList.remove('active');
    }
  });

  resaultBox.addEventListener('click', function (event) {
    event.stopPropagation();
    resaultBox.classList.add('active');
  });

  document.addEventListener('click', function (event) {
    if (event.target !== searchFocus && event.target !== resaultBox) {
      resaultBox.classList.remove('active');
    }
  });
}
//////////////////////////////////////////////////////// search site

//////////////////////////////////////////////////////// show password
var passwordInputs = document.querySelectorAll("input[type=password]");
var toggle = document.getElementById("password-toggle");

if (toggle) {
  toggle.addEventListener("change", function () {
    for (var i = 0; i < passwordInputs.length; i++) {
      if (passwordInputs[i].type === "password") {
        passwordInputs[i].type = "text";
      } else {
        passwordInputs[i].type = "password";
      }
    }
  });
}
//////////////////////////////////////////////////////// show password

//////////////////////////////////////////////////////// lazy load image
// script.js
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll('img[data-src]');

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          // درخواست AJAX برای دریافت تصویر
          fetch(lazyImage.dataset.src)
            .then(response => response.blob())
            .then(blob => {
              let objectURL = URL.createObjectURL(blob);
              lazyImage.src = objectURL;
              lazyImage.onload = function () {
                lazyImage.classList.add("loaded");
              };
            });
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers without IntersectionObserver support
    let lazyLoad = function () {
      lazyImages.forEach(function (lazyImage) {
        if (lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0 && getComputedStyle(lazyImage).display !== "none") {
          fetch(lazyImage.dataset.src)
            .then(response => response.blob())
            .then(blob => {
              let objectURL = URL.createObjectURL(blob);
              lazyImage.src = objectURL;
              lazyImage.onload = function () {
                lazyImage.classList.add("loaded");
              };
            });
        }
      });

      if (lazyImages.length == 0) {
        document.removeEventListener("scroll", lazyLoad);
        window.removeEventListener("resize", lazyLoad);
        window.removeEventListener("orientationchange", lazyLoad);
      }
    };

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
  }
});

//////////////////////////////////////////////////////// lazy load image

//////////////////////////////////////////////////////// like button
document.addEventListener("DOMContentLoaded", function () {
  const btnAction = document.querySelectorAll('[data-action]');

  btnAction.forEach(button => {
    button.addEventListener('click', function () {
      this.classList.toggle('active');
    });
  });
});
//////////////////////////////////////////////////////// like button


/////////////////////////////////////////////////////// copy link
// بررسی وجود المان با شناسه copyButton
var copyButton = document.querySelector('#copyButton');
if (copyButton) {
  // اضافه کردن رویداد click به دکمه
  copyButton.addEventListener('click', function () {
    // دریافت URL صفحه فعلی
    var currentURL = window.location.href;

    // کپی URL به کلیپ‌بورد
    navigator.clipboard.writeText(currentURL).then(function () {
      console.log('URL copied to clipboard');
    }).catch(function (err) {
      console.error('Could not copy URL: ', err);
    });

    // تغییر متن دکمه
    var buttonText = document.getElementById('buttonText');
    if (buttonText) {
      buttonText.textContent = 'کپی شد!';
    }

    // اضافه کردن کلاس active به دکمه
    copyButton.classList.add('active');

    // بازگرداندن حالت دکمه بعد از 3 ثانیه
    setTimeout(function () {
      if (buttonText) {
        buttonText.textContent = 'کپی کردن لینک';
      }
      copyButton.classList.remove('active');
    }, 3000);
  });
}

/////////////////////////////////////////////////////// copy link

/////////////////////////////////////////////////////// change text
const paragraphs = document.querySelectorAll('a.info-text');
if (paragraphs.length > 0) {
  let index = 0;
  setInterval(() => {
    paragraphs[index].classList.remove('active');
    index++;
    if (index === paragraphs.length) {
      index = 0;
    }
    paragraphs[index].classList.add('active');
  }, 3000);
}
/////////////////////////////////////////////////////// change text

/////////////////////////////////////////////////////// tab switch
function switchTab(evt) {
  var i, tabcontent, tablinks;

  // Hide all tab contents
  tabcontent = document.querySelectorAll(".tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove active class from all tab links
  tablinks = document.querySelectorAll(".tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show the selected tab and mark the button as active
  var tabId = evt.currentTarget.dataset.tab;
  document.querySelector("#" + tabId).style.display = "block";
  evt.currentTarget.classList.add("active");

  // Update the class of the switch-tab container based on the selected tab
  var switchTabDiv = document.querySelector('.switch-tab');

  // First remove any existing classes starting with 'tab'
  switchTabDiv.classList.forEach(className => {
    if (className.startsWith('tab')) {
      switchTabDiv.classList.remove(className);
    }
  });

  // Add the new tab class
  switchTabDiv.classList.add(tabId);

  // Select the first tab by default if no tab is currently active
  if (!document.querySelector(".tablinks.active")) {
    var defaultTabButton = document.querySelector(".tablinks");
    defaultTabButton.classList.add("active");
    var defaultTabId = defaultTabButton.dataset.tab;
    document.querySelector("#" + defaultTabId).style.display = "block";

    // Add the default tab class to switch-tab container
    switchTabDiv.classList.add(defaultTabId);
  }
}
/////////////////////////////////////////////////////// tab switch

///////////////////////////////////////////// popUp multiple
const overlay = document.querySelector(".overlay");
const btns_close = document.querySelectorAll(".btn_close");
const btns_modal = document.querySelectorAll(".btn_modal");
const modals = document.querySelectorAll(".modal");

btns_modal.forEach((btn) => btn.addEventListener("click", openModal));
btns_close.forEach((btn) => btn.addEventListener("click", closeModal));

function openModal(e) {
  const idModal = e.target.getAttribute("data-modal");
  const modal = document.querySelector(idModal);
  if (modal) {
    overlay.classList.add("visible");
    modal.classList.add("visible");
  }
}

function closeModal() {
  modals.forEach((modal) => modal.classList.remove("visible"));
  overlay.classList.remove("visible");
}
///////////////////////////////////////////// popUp multiple

/////////////////////////////////////////////////////// add to cart
document.addEventListener('DOMContentLoaded', function () {
  // بررسی اینکه عناصر مورد نظر موجود هستند
  const addToCartButton = document.getElementById('addToCart');
  const myParagraph = document.getElementById('myParagraph');
  const animationSpan = document.querySelector('.animation');
  const addToCartDiv = document.querySelector('.add-to-cart');
  const overlayDiv = document.querySelector('.overlay');
  const quantityDiv = document.getElementById('quantity');

  // اطمینان از اینکه تمام عناصر موجود هستند قبل از افزودن لیسنر
  if (addToCartButton && myParagraph && animationSpan && addToCartDiv && overlayDiv && quantityDiv) {
    addToCartButton.addEventListener('click', function () {
      // حذف پاراگراف
      myParagraph.remove();

      // اضافه کردن کلاس animate به span
      animationSpan.classList.add('animate');

      // 3 ثانیه بعد مخفی کردن دکمه و نمایش دیو
      setTimeout(function () {
        addToCartButton.classList.add('hidden');
        addToCartDiv.classList.add('visible');
        overlayDiv.classList.add('visible');
        quantityDiv.classList.add('show');

        // بعد از 4 ثانیه، کلاس visible از .add-to-cart حذف شود
        setTimeout(function () {
          addToCartDiv.classList.remove('visible');
          overlayDiv.classList.remove('visible');
        }, 5000); // 2000 میلی‌ثانیه یعنی 2 ثانیه بعد
      }, 3000); // 3000 میلی‌ثانیه یعنی 3 ثانیه بعد
    });
  }
});
/////////////////////////////////////////////////////// add to cart

/////////////////////////////////////////////////////// rate
// گرفتن ستاره‌ها و متنی که امتیاز را نمایش می‌دهد
const stars = document.querySelectorAll('.star');
const ratingText = document.querySelector('.rating-text');

// هنگام کلیک بر روی ستاره‌ها
stars.forEach(star => {
  star.addEventListener('click', function () {
    const rating = this.getAttribute('data-value');
    updateStars(rating);
    updateText(rating);
  });
});

// تغییر رنگ ستاره‌ها بر اساس امتیاز انتخاب شده
function updateStars(rating) {
  stars.forEach(star => {
    if (star.getAttribute('data-value') <= rating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

// به‌روزرسانی متن امتیاز
function updateText(rating) {
  let text = '';
  switch (rating) {
    case '1':
      text = 'خیلی بد';
      break;
    case '2':
      text = 'بد';
      break;
    case '3':
      text = 'معمولی';
      break;
    case '4':
      text = 'خوب';
      break;
    case '5':
      text = 'عالی';
      break;
  }
  ratingText.innerHTML = `امتیاز شما: <span>${text}</span>`;
}
/////////////////////////////////////////////////////// rate

/////////////////////////////////////////////////////// acc
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('[data-accordion-toggle]');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const targetItem = this.closest('.accordion-item');
      const targetContent = targetItem.querySelector('.accordion-content');
      const isActive = targetContent.classList.contains('active');

      // بستن همه آیتم‌های دیگر
      const allContents = document.querySelectorAll('.accordion-content');
      allContents.forEach(content => {
        content.classList.remove('active');
      });

      // برداشتن کلاس active از همه دکمه‌ها
      const allButtons = document.querySelectorAll('.accordion-button');
      allButtons.forEach(btn => {
        btn.classList.remove('active');
      });

      // اگر آیتم انتخابی باز نباشد، آن را باز کن، در غیر این صورت آن را ببند
      if (!isActive) {
        targetContent.classList.add('active');
        this.classList.add('active');
      }
    });
  });
});
/////////////////////////////////////////////////////// acc

/////////////////////////////////////////////////////// filter price
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector('.slider2');
  const minSpan = document.querySelector('.min');
  const maxSpan = document.querySelector('.max');
  const progress = document.querySelector('.progress2');
  const minPriceInput = document.getElementById('min-price');
  const maxPriceInput = document.getElementById('max-price');

  // بررسی وجود عناصر مورد نظر
  if (!slider || !minSpan || !maxSpan || !progress || !minPriceInput || !maxPriceInput) {
    return;
  }

  // دریافت مقدارهای اولیه از HTML
  let minValue = parseInt(minSpan.getAttribute('data-min'));
  let maxValue = parseInt(maxSpan.getAttribute('data-max'));
  const maxLimit = maxValue; // حداکثر مقدار از HTML

  // فرمت قیمت به تومان
  function formatPrice(value) {
    return value.toLocaleString('fa-IR', { style: 'decimal', maximumFractionDigits: 3 });
  }

  // به روز رسانی اسلایدر
  function updateSlider() {
    const minLeft = (minValue / maxLimit) * 100;
    const maxLeft = (maxValue / maxLimit) * 100;

    minSpan.style.left = `${minLeft}%`;
    maxSpan.style.left = `${maxLeft}%`;
    progress.style.left = `${minLeft}%`;
    progress.style.width = `${maxLeft - minLeft}%`;

    minPriceInput.value = formatPrice(minValue);
    maxPriceInput.value = formatPrice(maxValue);
  }

  // رویدادهای کشیدن اسپن‌ها
  let isDraggingMin = false;
  let isDraggingMax = false;

  // هنگام کشیدن اسپن min
  minSpan.addEventListener('mousedown', () => {
    isDraggingMin = true;
  });

  // هنگام کشیدن اسپن max
  maxSpan.addEventListener('mousedown', () => {
    isDraggingMax = true;
  });

  // هنگام حرکت موس
  document.addEventListener('mousemove', (e) => {
    if (isDraggingMin || isDraggingMax) {
      const sliderRect = slider.getBoundingClientRect();
      let newLeft = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;

      // تغییرات اسپن min
      if (isDraggingMin) {
        if (newLeft < 0) newLeft = 0; // محدود کردن به 0
        if (newLeft > (maxValue / maxLimit) * 100) {
          newLeft = (maxValue / maxLimit) * 100 - 1; // جلوگیری از عبور از max
        }

        minSpan.style.left = `${newLeft}%`;
        minValue = Math.round((newLeft / 100) * maxLimit); // بروزرسانی مقدار min
      }

      // تغییرات اسپن max
      if (isDraggingMax) {
        if (newLeft > 100) newLeft = 100; // محدود کردن به 100
        if (newLeft < (minValue / maxLimit) * 100) {
          newLeft = (minValue / maxLimit) * 100 + 1; // جلوگیری از عبور از min
        }

        maxSpan.style.left = `${newLeft}%`;
        maxValue = Math.round((newLeft / 100) * maxLimit); // بروزرسانی مقدار max
      }

      updateSlider(); // به روز رسانی اسلایدر
    }
  });

  // هنگام رها کردن موس
  document.addEventListener('mouseup', () => {
    isDraggingMin = false;
    isDraggingMax = false;
  });

  // مقداردهی اولیه
  function setInitialValues() {
    minValue = parseInt(minSpan.getAttribute('data-min'));
    maxValue = parseInt(maxSpan.getAttribute('data-max'));

    updateSlider();
  }

  setInitialValues();
});

/////////////////////////////////////////////////////// filter price

/////////////////////////////////////////////////////// compare item
document.addEventListener('DOMContentLoaded', function () {
  const parentBox = document.querySelector('.mini-box3');
  const compareBox = document.querySelector('.compare-item');
  const submitButton = document.querySelector('.btn_modal');
  const otherBox1 = document.querySelector('.overlay');
  const otherBox2 = document.querySelector('.modal');

  // ادامه فقط در صورتی که همه عناصر پیدا شوند
  if (!parentBox || !compareBox || !submitButton || !otherBox1 || !otherBox2) {
    return;
  }

  // ذخیره موقعیت‌های اولیه
  const originalOrder = {};

  // تنظیم تعداد مجاز بر اساس سایز صفحه
  let maxItems = 4; // پیش‌فرض دسکتاپ

  // بررسی سایز صفحه و تنظیم maxItems
  function updateMaxItems() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      maxItems = 2; // موبایل و تبلت
    } else {
      maxItems = 4; // دسکتاپ
    }
    enforceMaxItems(); // بررسی تعداد آیتم‌ها
  }

  // حذف آیتم‌های اضافی در صورت لزوم
  function enforceMaxItems() {
    while (compareBox.children.length > maxItems) {
      const lastChild = compareBox.lastElementChild;
      if (lastChild) {
        const dataItemValue = lastChild.dataset.item;
        const position = originalOrder[dataItemValue];
        const referenceNode = parentBox.children[position];

        if (referenceNode) {
          parentBox.insertBefore(lastChild, referenceNode);
        } else {
          parentBox.appendChild(lastChild);
        }

        // مخفی کردن دکمه حذف
        const removeButton = lastChild.querySelector('.remove-item');
        if (removeButton) {
          removeButton.classList.remove('show');
          removeButton.classList.add('hidden');
        }
      }
    }

    // تنظیم دکمه ارسال بر اساس تعداد آیتم‌ها
    if (compareBox.children.length === maxItems) {
      submitButton.classList.add('hidden');
    } else {
      submitButton.classList.remove('hidden');
    }
  }

  // بروز رسانی تعداد مجاز هنگام تغییر سایز صفحه
  window.addEventListener('resize', updateMaxItems);

  // اجرای اولیه برای بررسی سایز صفحه
  updateMaxItems();

  // رویداد کلیک روی والد اصلی
  parentBox.addEventListener('click', function (e) {
    const itemElement = e.target.closest('[data-item]');
    if (itemElement && compareBox.children.length < maxItems) {
      const dataItemValue = itemElement.dataset.item;

      // ذخیره موقعیت اولیه اگر قبلاً ذخیره نشده باشد
      if (!originalOrder[dataItemValue]) {
        originalOrder[dataItemValue] = Array.from(parentBox.children).indexOf(itemElement);
      }

      // انتقال به دیو مقصد
      compareBox.appendChild(itemElement);

      // نمایش دکمه حذف
      const removeButton = itemElement.querySelector('.remove-item');
      if (removeButton) {
        removeButton.classList.remove('hidden');
        removeButton.classList.add('show');
      }

      // حذف کلاس visible از دو باکس دیگر
      otherBox1.classList.remove('visible');
      otherBox2.classList.remove('visible');

      // بررسی تعداد آیتم‌ها برای تغییر وضعیت دکمه
      if (compareBox.children.length === maxItems) {
        submitButton.classList.add('hidden');
      }
    }
  });

  // رویداد کلیک روی دکمه حذف
  compareBox.addEventListener('click', function (e) {
    const removeButton = e.target.closest('.remove-item');
    if (removeButton) {
      // گرفتن مقدار data-item
      const dataItemValue = removeButton.closest('[data-item]').dataset.item;

      // انتخاب آیتم با data-item
      const itemElement = document.querySelector(`[data-item="${dataItemValue}"]`);

      if (itemElement) {
        // بازگرداندن آیتم به موقعیت اصلی
        const position = originalOrder[dataItemValue];
        const referenceNode = parentBox.children[position];

        if (referenceNode) {
          parentBox.insertBefore(itemElement, referenceNode);
        } else {
          parentBox.appendChild(itemElement);
        }

        // مخفی کردن دکمه حذف
        removeButton.classList.remove('show');
        removeButton.classList.add('hidden');

        // بررسی تعداد آیتم‌ها برای تغییر وضعیت دکمه
        if (compareBox.children.length < maxItems) {
          submitButton.classList.remove('hidden');
        }
      }
    }
  });
});
/////////////////////////////////////////////////////// compare item

/////////////////////////////////////////////////////// add and edit addres
function toggleItems({ hideSelector, showSelector }) {
  const hideElement = document.querySelector(hideSelector);
  const showElement = document.querySelector(showSelector);

  if (hideElement && showElement) {
    hideElement.classList.add('hidden');
    hideElement.classList.remove('active');
    showElement.classList.remove('hidden');
    showElement.classList.add('active');
  } else {
    console.error('Elements not found! Check your selectors.');
  }
}

function nextItem() {
  toggleItems({ hideSelector: '.item-box1', showSelector: '.item-box2' });
}

function prevItem() {
  toggleItems({ hideSelector: '.item-box2', showSelector: '.item-box1' });
}

/////////////////////////////////////////////////////// add and edit addres

/////////////////////////////////////////////////////// info order
const deletePopup = id => {
  let deleteBox = document.getElementById('delete');
  const overlay = document.querySelector('.overlay');
  deleteBox.classList.add('visible');
  overlay.classList.add('visible');
  localStorage.setItem('user', id);

  console.log(id);

  overlay.addEventListener('click', function () {
    deleteBox.classList.remove('visible');
    overlay.classList.remove('visible');
  })
}

function deleteForm() {
  const form = document.querySelector('.form-delete');
  const address = document.querySelector('#address').value;

  form.action = address + localStorage.getItem('user')
  console.log(address + localStorage.getItem('user'));
}
/////////////////////////////////////////////////////// info order

/////////////////////////////////////////////////////// info order
const listPopup = id => {
  let wishList = document.getElementById('wish-list');
  const overlay = document.querySelector('.overlay');
  wishList.classList.add('visible');
  overlay.classList.add('visible');
  localStorage.setItem('user', id);

  console.log(id);

  overlay.addEventListener('click', function () {
    wishList.classList.remove('visible');
    overlay.classList.remove('visible');
  })
}

function deleteForm() {
  const form = document.querySelector('.form-delete');
  const address = document.querySelector('#address').value;

  form.action = address + localStorage.getItem('user')
  console.log(address + localStorage.getItem('user'));
}
/////////////////////////////////////////////////////// info order

///////////////////////////////////////////// filter popup
var numberOfItems = 10;
for (var i = 1; i <= numberOfItems; i++) {
  (function () {
    var adTypeBtn = document.getElementById('ad-type-btn-' + i);
    var adTypeUl = document.getElementById('ad-type-ul-' + i);

    if (adTypeBtn && adTypeUl) {
      adTypeBtn.addEventListener('click', function () {
        adTypeBtn.classList.toggle('active');
        adTypeUl.classList.toggle('active');
      });

      document.addEventListener('click', function (event) {
        var isUlOrLiClicked = adTypeUl.contains(event.target) || event.target === adTypeBtn;

        if (!isUlOrLiClicked) {
          adTypeUl.classList.remove('active');
          adTypeBtn.classList.remove('active');
        }
      });

      var adTypeLiItems = adTypeUl.getElementsByTagName('li');

      for (var j = 0; j < adTypeLiItems.length; j++) {
        adTypeLiItems[j].addEventListener('click', function () {
          var liText = this.innerText;
          var pTag = adTypeBtn;
          for (var k = 0; k < adTypeLiItems.length; k++) {
            adTypeLiItems[k].classList.remove('active');
          }

          this.classList.add('active');
          pTag.innerText = liText;
        });
      }
    }
  })();
}
///////////////////////////////////////////// filter popup

///////////////////////////////////////////// send again code
// گرفتن المنت‌های مورد نیاز
const timerElement = document.getElementById("timer");
const timerDiv = document.getElementById("timerDiv");
const resultDiv = document.getElementById("resultDiv");

// بررسی وجود المان‌ها
if (timerElement && timerDiv && resultDiv) {
  // تبدیل زمان به ثانیه
  let totalSeconds = 2 * 60;

  // تنظیم تایمر
  const interval = setInterval(() => {
    // محاسبه دقیقه و ثانیه
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // آپدیت نمایش تایمر
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // چک کردن زمان تمام شدن
    if (totalSeconds === 0) {
      clearInterval(interval); // متوقف کردن تایمر
      timerDiv.classList.add("hidden"); // مخفی کردن تایمر
      resultDiv.classList.remove("inactive"); // نشان دادن نتیجه
      resultDiv.classList.add("active");
    }

    totalSeconds--;
  }, 1000);
}

///////////////////////////////////////////// send again code

///////////////////////////////////////////// set password
document.addEventListener("DOMContentLoaded", () => {
  // انتخاب المان‌ها
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("errorMessage");
  const validatorDiv = document.getElementById("passwordValidator");
  const submitButton = document.getElementById("submitButton");

  // بررسی وجود المان‌ها
  if (passwordInput && errorMessage && validatorDiv && submitButton) {
    const requirements = {
      length: /^.{8,}$/, // حداقل 8 کاراکتر
      'uppercase-lowercase': /(?=.*[a-z])(?=.*[A-Z])/, // حداقل یک حرف بزرگ و یک حرف کوچک
      number: /\d/, // حداقل یک عدد
      special: /[@$!%*?&]/, // حداقل یک کاراکتر خاص
    };

    passwordInput.addEventListener("input", () => {
      const value = passwordInput.value.trim();

      // بررسی کاراکترهای غیرانگلیسی
      if (/[^\x00-\x7F]/.test(value)) {
        errorMessage.classList.add("active");
      } else {
        errorMessage.classList.remove("active");
      }

      // نمایش یا پنهان کردن ولیداتور
      if (value) {
        validatorDiv.classList.add("active");
      } else {
        validatorDiv.classList.remove("active");
      }

      // بررسی هر شرط و اعمال کلاس فعال بر روی <p> مربوطه
      let allValid = true; // پرچم برای بررسی موفقیت تمام شروط

      for (const [key, regex] of Object.entries(requirements)) {
        const target = document.querySelector(`p[data-res="${key}"]`);
        if (target) {
          if (regex.test(value)) {
            target.classList.add("active");
          } else {
            target.classList.remove("active");
            allValid = false; // اگر هر شرطی رد شود، پرچم غیر معتبر می‌شود
          }
        }
      }

      // اگر همه شرایط معتبر باشند، دکمه فعال می‌شود
      if (allValid && !/[^\x00-\x7F]/.test(value) && value) {
        submitButton.classList.add("enable");
        submitButton.disabled = false; // فعال کردن دکمه
      } else {
        submitButton.classList.remove("enable");
        submitButton.disabled = true; // غیرفعال کردن دکمه
      }
    });

    // جلوگیری از وارد کردن کاراکترهای غیرانگلیسی
    passwordInput.addEventListener("keypress", (e) => {
      if (/[^\x00-\x7F]/.test(e.key)) {
        e.preventDefault();
      }
    });
  }
});


///////////////////////////////////////////// set password

///////////////////////////////////////////// change language
document.addEventListener('DOMContentLoaded', () => {
  // بررسی وجود المان 'output' و لیست 'li[data-flag]'
  const output = document.getElementById('output');
  const listItems = document.querySelectorAll('li[data-flag]');

  if (output && listItems.length > 0) {
    // بازیابی داده‌های ذخیره‌شده از Local Storage
    const savedFlag = localStorage.getItem('selectedFlag');
    if (savedFlag) {
      // پیدا کردن تصویر مرتبط بر اساس data-flag ذخیره‌شده
      const savedItem = Array.from(listItems).find(li => li.getAttribute('data-flag') === savedFlag);
      if (savedItem) {
        const savedImageSrc = savedItem.querySelector('img').getAttribute('src');
        output.innerHTML = `<img src="${savedImageSrc}" alt="${savedFlag}">`;
      }
    }

    // رویداد کلیک برای هر تگ li
    listItems.forEach((li) => {
      li.addEventListener('click', () => {
        // گرفتن تصویر داخل li
        const img = li.querySelector('img');

        // بررسی اینکه آیا تصویر داخل li وجود دارد
        if (img) {
          const imgSrc = img.getAttribute('src');
          const flag = li.getAttribute('data-flag');

          // جایگزینی عکس در تگ p
          output.innerHTML = `<img src="${imgSrc}" alt="${flag}">`;

          // ذخیره مقدار data-flag در Local Storage
          localStorage.setItem('selectedFlag', flag);
        } else {
          console.warn('تصویری در این آیتم پیدا نشد.');
        }
      });
    });
  }
});

///////////////////////////////////////////// change language

///////////////////////////////////////////// mega menu mobile
// انتخاب دکمه و دیو
const btnCategory = document.querySelector('.btn-category');
const megaMobile = document.querySelector('.mega-mobile');

// بررسی وجود المان‌ها
if (btnCategory && megaMobile) {
  // افزودن رویداد کلیک
  btnCategory.addEventListener('click', () => {
    // تغییر کلاس اکتیو روی دکمه و دیو
    btnCategory.classList.toggle('active');
    megaMobile.classList.toggle('active');
  });
}

///////////////////////////////////////////// mega menu mobile

///////////////////////////////////////////// lists shows
function showList() {
  const listFeatures = document.querySelector('.list-features');
  const closeList = document.querySelector('.close-list');
  const body = document.body;

  // تغییر کلاس اکتیو روی دکمه و دیو
  listFeatures.classList.toggle('active');

  // بررسی اگر کلاس اکتیو وجود نداشت
  if (!listFeatures.classList.contains('active')) {
    closeList.classList.add('hidden');
    body.classList.remove('no-scroll'); // اسکرول فعال شود
  } else {
    closeList.classList.remove('hidden');
    body.classList.add('no-scroll'); // اسکرول غیرفعال شود
  }
};
///////////////////////////////////////////// lists shows

///////////////////////////////////////////// panel mobile
function panelMobile() {
  const panelRight = document.querySelector('.panel-right')
  const panelMobile = document.querySelector('.panle-mobile')

  panelRight.classList.toggle('active');
  panelMobile.classList.toggle('active');
}
///////////////////////////////////////////// panel mobile