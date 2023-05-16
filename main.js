let projectview = document.getElementById('project__view');
let tabs = document.getElementsByClassName('project__tab');

function view(clickedTab, index) {
  projectview.innerHTML = "";
  let items = document.querySelectorAll(".view-" + index +  " .app-a");
  for(let i = 0; i< tabs.length; i++){
    tabs[i].setAttribute('style', 'background-color: var(--color-secondary); border-bottom: 2px solid black;');
  }
  clickedTab.setAttribute('style', 'background-color: var(--color-primary); border-bottom: none; height: 56px;')

  for(let i = 0; i< items.length; i++){
    projectview.appendChild(items[i].cloneNode(true));
  }
}