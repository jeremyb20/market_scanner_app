export function objectsAreEqual(this: any, a:any, b:any) {
  for (var prop in a) {
    if (a.hasOwnProperty(prop) && b.hasOwnProperty(prop)) {
      if (typeof a[prop] === 'object') {
        if (!this.objectsAreEqual(a[prop], b[prop]))
          return true;
      } else 
          if (a[prop] !== b[prop])
            return true;
    } else 
      return true;
  }
  return false;
}