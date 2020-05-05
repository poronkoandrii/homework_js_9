// Создать HTML-страницу для отображения/редактирования текста. При открытии страницы текст отображается с помощью тега div. При нажатии Ctrl + E,
//  вместо div появляется textarea с тем же текстом, который теперь можно редактировать. При нажатии Ctrl + ,
//  вместо textarea появляется div с уже измененным текстом. Не забудьте выключить поведение по умолчанию для этих сочетаний клавиш.

document.addEventListener("keydown", function (event) {
  if (event.code == "KeyE" && event.ctrlKey) {
    event.preventDefault();
    let div = document.querySelector(".content");
    div.classList.add("hide");
    let textarea = document.createElement("textarea");
    textarea.innerHTML = div.innerHTML.replace(/\s+/g, " ").trim();
    let mainer = document.querySelector(".mainer");
    mainer.appendChild(textarea);
  }
  if (event.code == "KeyQ" && event.ctrlKey) {
    event.preventDefault();
    let textarea = document.querySelector("textarea").value;
    let div = document.querySelector(".content");
    div.innerHTML = textarea;
    div.classList.remove("hide");
    let txt = document.querySelector("textarea");
    if (txt.parentNode) {
      txt.parentNode.removeChild(txt);
    }
  }
});
// Создать HTML-страницу с большой таблицей. При клике по заголовку колонки,
// необходимо отсортировать данные по этой колонке. Учтите, что числовые значения
// должны сортироваться как числа, а не как строки.
const th = document.querySelector("th");
th.addEventListener("click", function () {
  let arr = Array.from(table.rows).slice(1);
  arr.sort(function (a, b) {
    return a.cells[0].innerHTML > b.cells[0].innerHTML ? 1 : -1;
  });
  table.append(...arr);
});
// Создать HTML-страницу с блоком текста в рамочке. Реализовать возможность изменять размер блока,
// если зажать мышку в правом нижнем углу и тянуть ее дальше.

const block = document.querySelector(".content");
block.addEventListener("mousedown", mousedown);
function mousedown(e) {
  let width = block.offsetWidth;
  let height = block.offsetHeight;
  let maxWidth = document.body.offsetWidth;
  let f = (maxWidth - width) / 2 + width;
  let posX = e.pageX;
  let posY = e.pageY;

  if (e.clientY > height - 20 && e.clientX > f - 20) {
    function mousemove(e) {
      let newWidth = width + e.pageX - posX;
      let newHeight = height + e.pageY - posY;
      block.style.width = `${newWidth}px`;
      block.style.height = `${newHeight}px`;
    }
    document.addEventListener("mousemove", mousemove);
  }
  document.addEventListener("mouseup", function (e) {
    document.removeEventListener("mousemove", mousemove);
  });
}
// Есть нюанс, когда блок уменьшен, повторное изменение не доступно, причину не понимаю.
// При увеличении все работает корректно.
