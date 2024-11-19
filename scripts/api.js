// api url'i
// const url = "https://shazam.p.rapidapi.com/search?term=tarkan&locale=tr";

// gönderilmesi gereken header'lar(bunun amacı da api'nin biz olduğunu bilmesi gerektiğinden)
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "1efc9f745fmsh71ff1ec50ab9738p1ab034jsnbef54d42b566",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

// bu url ve options'u api'ye istek atarken göndermemiz gerekiyor çünkü bizim olduğumuzu anlayamaz ve 401 hatası verir. (yani yetkilendirilmemiş der.)

/* 
* export const getPopular= async () =>{};
* export const searchMusic= async (aratılanKelime) => {};
? foksiyonları böyle de oluşturup api isteği atabiliriz ancak başka tarz bir yaklaşımda bulunacağız. Farklı metot görmemiz için aşağıdaki yöntemle yapıyoruz. O yüzden yorum satırına aldım.
*/

// Foksiyonların bir arada tutulması için class yapısını tercih edeceğiz.
export default class API {
  // popüler müzikleri getirecek.
  async getPopular() {
    const data1 = await this.searchMusic("dedublüman");
    const data2 = await this.searchMusic("kıraç");
    const data3 = await this.searchMusic("barış");
    const data4 = await this.searchMusic("sagopa");
    return [...data1, ...data2, ...data3, ...data4];

    // const res = await fetch(url, options);
    // const data = await res.json();

    // * api'den gelen cevabı daha iyi bir formata çevirdik. Arada gereksiz bir katman vardı onu kaldırmak için map ile diziyi döndük.
    // const formatted = data.tracks.hits.map((item) => item.track);
    /* const formatted1 = data.tracks.hits.map((item) => {
        return item.track });
     ! arrow fonksiyonlarında return yazmamak için ilave olarak () parantez içerisine almamız yeterli olur. Yani formatted1 fonksiyonunu return ile yazmak  yerine formatted fonksiyonunu () içerisine alıp yazabiliriz. Ancak arrow fonksiyonlarında muhtemelen bir özellik daha var eğer tek satırsa yazılan kod, paranteze e ihtiyaç olmuyor. data.tracks.hits.map((item) => (item.track )); yazmak yerine sağdaki () kaldırabiliriz.
    */
    // fonksiyonun çağırıldığı yere veriyi döndürelim.
    // return formatted;
  }
  // aratılan kelimeye uygun sonuçları getirecek.
  async searchMusic(query) {
    // term parametresini dinamik olarak belirledik
    const url = `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr`;

    // api isteğini at - gelen cevabı işle
    const res = await fetch(url, options);
    const data = await res.json();

    // veriyi formatladık
    const formatted = data.tracks.hits.map((item) => item.track);

    // fonksiyonun çağırıldığı yere veriyi döndürdük.
    return formatted;
  }
}
