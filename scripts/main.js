import API from "./api.js";
import UI from "./ui.js";

// class'ın örneğini al ( metotları kullanabilmek için)
const api = new API();
const ui = new UI();

// sayfa yüklendiği anda api'dan popüler müzikleri al ve ekrana bas(renderla)

document.addEventListener("DOMContentLoaded", () => {
  // api isteğinden önce ekrana loader basıyoruz.
  ui.renderLoader();

  // api isteği atıyoruz.
  // * 1-) then-catch
  api
    .getPopular()
    .then((data) => {
      // gelen data içerisindeki her bir nesne için ekrana kartları basacağız.
      ui.renderCards(data);
    })
    .catch((err) => {
      console.log(err);
      alert("Üzgünüz bir sorun oluştu...");
    });
  // * 2-) async-await ( bunu kullanırsak fonksiyonun başına async yazmalıyız.) İki yöntem de aynıdır sadece gideceğimiz yol biraz değişiyor.
  /*
    try {
        const data = await api.getPopular();
        console.log(data);
    } catch (err) {
        console.log(err);
        alert("Üzgünüz bir sorun oluştu...");
    }
    */
});

// formdan birşey aratıldığında api'dan aratılan kelimeye uygun sonuçları al ve renderla.
ui.form.addEventListener("submit", (e) => {
  // formların sayfayı yenileme olayı vardır. yenilenmesini istemiyorsak e.preventDefault() yazmalıyız.
  e.preventDefault();
  // aratılan kelimeye eriş
  const query = e.target[0].value;

  // aratılan kelime boşsa fonksiyonu durduracağız. Bunun için parametre yoksa fonksiyonu durduracağız. Bunu da if ile eğer query(aratılan) boş string ise alert olarak uyarı ver yapıyoruz. Burada kullandığımız trim() metodu aratılan kelimenin vs. başındaki ve sonundaki boşlukları silen bir metotdur.
  if (query.trim() === "") return alert("Lütfen geçerli bir metin aratın...");

  // ekrana loader bas
  ui.renderLoader();

  // başlığı güncelle
  ui.updateTitle(query + " için sonuçlar");

  // api'dan verileri alacağız.
  api
    .searchMusic(query)
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log(err);
      alert("Üzgünüz bir sorun oluştu...");
    });
});

// liste alanındaki tıklanma olaylarını izle ve eğer oynat butonuna tıklanırsa o şarkıyı oynat

ui.list.addEventListener("click", (e) => {
  // eğer oynat butonuna tıklanırsa o şarkıyı oynat
  if (e.target.className === "play") {
    // oynatılacak şarkının kartına eriş (burada card elementine ulaştık ama ileride yapılacak güncellemelerde yani yeni bir div eklersek veya çıkarırsak bunu js de de düzeltmemiz gerekebilir. Bu durumlarla karşılaşmamak için closest etiketini kullanmalıyız. Bu etiket en yakın ... clasına sahip element olarak kullanılabilir.)
    // const card = e.target.parentElement.parentElement;
    const card = e.target.closest(".card");
    // oynatılacak şarkının bilgilerini alacağız
    const data = card.dataset;
    // player alanını tekrar renderlayacağız.
    ui.renderPlayer(data);
  }
});
