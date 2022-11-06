// 简单补间动画

// 管理对象状态
class Compose {
  constructor() {
    this.parent = null
    this.children = []
  }
  add(obj) {
    obj.parent = this
    this.children.push(obj)
  }
  update(t) {
    this.children.forEach(child => {
      child.update(t)
    })
  }
}


function getValBetweenFms(time, fms, last) {
  // 第一个帧和 最后一个帧的补间状态
  for (let i = 0; i < last; i++){
    const fm1 = fms[i]
    const fm2 = fms[i + 1]
    if (time >= fm1[0] && time <= fm2[0]) {
      // 向量
      const delta = {
        x: fm2[0] - fm1[0],
        y: fm2[1] - fm1[1]
      }
      const k = delta.y / delta.x
      const b = fm1[1] - fm1[0] * k
      return k*time + b
    }
  }
}

// 时间轨道 t
class Track {
  constructor(target) {
   this.target = target
   this.parent = null
    this.start = 0
    this.timelen = 5
    this.loop = false
    // 关键帧
    this.keyMap = new Map()
  }
  update(t) {
    const { keyMap, timelen, target, loop } = this
    let time = t - this.start
    if (loop) {
      time = time % timelen
    }
    for (const [key, fms] of keyMap.entries()) {
      const last = fms.length - 1
      if (time < fms[0][0]) {
        // 小于第一个帧时间
        target[key] = fms[0][1]
      } else if (time > fms[last][0]) {
        // 大于最后一个帧时间
        target[key] = fms[last][1]
      } else {
        target[key] = getValBetweenFms(time, fms, last)
      }
    }
  }
}
