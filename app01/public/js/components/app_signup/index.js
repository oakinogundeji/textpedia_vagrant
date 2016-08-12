module.exports = {
  template: require('./template.html'),
  data: function () {
    return {
      email: '',
      phoneNumber: '',
      submitURL: '/submit'
    };
  },
  methods: {
    submitCreds: function () {
      if(this.email.trim() && this.phoneNumber.trim()) {
        console.log('valid creds');
        var data = {
          email: this.email,
          phoneNumber: this.phoneNumber
        };
        this.$http.post(this.submitURL, {
          data: data
        }).
          then(function (res) {
            console.log('server resp', res.data);
            return this.$dispatch('show-confirm');
          }.bind(this)).
          catch(function (info) {
            return console.log('yawa gas', info);
          });
        this.email = this.phoneNumber = '';
      }
      else {
        return console.log('oops');
      }
    }
  }
};
