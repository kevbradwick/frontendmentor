(function(){
  const overlay = document.querySelector(".overlay");
  const checkbox = document.querySelector(".navigation__checkbox");
  const uncheckBox = () => checkbox.checked = false;

  overlay.addEventListener("click", uncheckBox);
}());
