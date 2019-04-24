function Cursor(attrs) {
  this.id = attrs.id;
  this.hovers = attrs.hovers;
  this.mouse = attrs.mouse;
}

// create and add the cursor to the document
Cursor.prototype.create = function() {
  const cursor = document.createElement("div");
  const parent = document.getElementsByTagName("body")[0];
  cursor.setAttribute("id", this.id);
  cursor.setAttribute("class", this.id);
  cursor.style = `position: absolute; pointer-events: none;`;
  parent.append(cursor);
  if (!this.mouse) parent.style.cursor = "none";
};

// run functions on different cursor status
Cursor.prototype.status = function() {
  document.addEventListener("mousemove", this.moving.bind(this));
  for (const hover of this.hovers) {
    const targets = [...document.querySelectorAll(hover)];
    for (const target of targets) {
      target.addEventListener("mouseover", this.hover.bind(this, target));
      target.addEventListener("mouseleave", this.leave.bind(this, target));
    }
  }
};

// cursor moving status
Cursor.prototype.moving = function() {
  const { pageX, pageY } = event;
  const cursor = document.getElementById(this.id);
  const posX = `${pageX - cursor.offsetWidth / 2}px`;
  const posY = `${pageY - cursor.offsetHeight / 2}px`;
  cursor.style.left = posX;
  cursor.style.top = posY;
};

Cursor.prototype.hover = function(hover) {
  const cursor = document.getElementById(this.id);
  const name = hover.getAttribute("data-class");
  cursor.classList.add(`${this.id}--${name}`);
};

Cursor.prototype.leave = function(hover) {
  const cursor = document.getElementById(this.id);
  const name = hover.getAttribute("data-class");
  cursor.classList.remove(`${this.id}--${name}`);
};

// init cursor
Cursor.prototype.run = function() {
  this.create();
  this.status();
};
