use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn count_to_10(f: &js_sys::Function) {
    for i in 0..10 {
        let _ = f.call1(&JsValue::null(), &JsValue::from(i));
    }

    let digest = md5::compute(b"abcdefghijklmnopqrstuvwxyz");
    let _ = f.call1(&JsValue::null(), &JsValue::from(format!("{:x}", digest)));
}

#[wasm_bindgen]
pub fn md5_benchmark(f: &js_sys::Function) {
    let mut i = 1;
    let null = JsValue::null();
    loop {
        md5::compute(format!("{}", i));
        if i % 1000000 == 0 {
            let _ = f.call1(&null, &null);
        }
        i += 1;
    }
}
