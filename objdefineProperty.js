function update() {
  app.innerText = obj.foo;
}
const app = {
  innerText: "",
};

function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log(`get ${key}:${val}`);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log(newVal, val);
        val = newVal;
        update();
      }
    },
  });
}
const obj = {};
defineReactive(obj, "foo", "");
setTimeout(() => {
  obj.foo = new Date().toLocaleTimeString();
  console.log(app);
}, 1000);
