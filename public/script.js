const n = new Proxy({}, {
  get(target, prop) {
    let code = prop;

    const proxy = new Proxy(() => {}, {
      get(target, prop) {
        if (prop === 'b') {
          return fetch('/api/', { method: 'POST', body: code }).then(res => res.json());
        }

        code += '.' + prop;
        return proxy;
      },

      apply(target, thisArg, args) {
        code += '(' + args.map(arg => {
          if (arg === console.log) return 'console.log';
          if (typeof arg === 'function') return arg.toString();
          
          return JSON.stringify(arg);
        }).join(', ') + ')';
        return proxy;
      }
    });

    return proxy;
  }
});

n.require("fs").promises.readFile("file.txt", 'utf8').then(text => text.toUpperCase()).then(console.log).b

n.require("fs").promises.readFile("file.txt", 'utf8').b.then(text => text.toUpperCase()).then(console.log)


n.x.y.z.b.then(console.log)
// should do fetch('/api/', { method: 'POST', body: 'x.y.z' }).then(res => res.json())

n.x.yy('Abc', 2).z.b.then(console.log)
// should do fetch('/api/', { method: 'POST', body: 'x.yy("abc").z' }).then(res => res.json())
