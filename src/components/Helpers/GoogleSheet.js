function GoogleSheet() {
  var instance = {};
  var google = google || null;

  // Set the instance.
  instance = this;

  // eslint-disable-next-line no-func-assign
  GoogleSheet = function() {
    return instance;
  };

  instance.getDataBase = (id) => {
    google.script.run.withSuccessHandler(() => {}).pushValueWebApp(id);
  };

  instance.getInfo = (npat) => {
    try {
      google.script.run
        .withSuccessHandler((data) => {
          let v = data.values;
          this.values = this.values.map((ob) => {
            if (ob.npat == npat) {
              ob.others = `${v[2]} - ${v[3]} - ${v[8]} - ${v[9]} - ${v[11]}`;
            }
            return ob;
          });
          console.log(this.values);
        })
        .getInfoWebApp(npat);
    } catch (e) {
      console.log("Erro ao coletar Google getInfo");
    }
  };
}

export let Sheet = new GoogleSheet();
