<template>
  <div id="app">
    <b-container fluid v-if="authorized">
      <h1>Финансы</h1>
      <b-form action="#" @submit.prevent="onSubmit" class="mb-4" inline>
        <b-form-input type="number" placeholder="Пришли финансы" v-model="money" />
        <b-button variant="success" type="submit">Добавить</b-button>
      </b-form>
      <b-tabs>
        <b-tab title="Finance">
          <b-list-group>
            <b-list-group-item v-for="(val,key,index) in finance[0]" :key="index" class="d-flex align-items-center">
              <span>{{names[0][key]}} - {{val}} руб</span>
              <b-button-group class="ml-4">
                <b-button @click.prevent="setDataOne(key, false, 'finance')">-</b-button>
                <b-button @click.prevent="setDataOne(key, true, 'finance')" variant="success">+</b-button>
                <b-button @click.prevent="setDataOne(key, 'new', 'finance')" variant="info">new</b-button>
              </b-button-group>
            </b-list-group-item>
          </b-list-group>
        </b-tab>
        <b-tab title="Percent">
          <b-list-group>
            <b-list-group-item>Всего процентов - {{allPercentValue}}</b-list-group-item>
            <b-list-group-item v-for="(val,key,index) in percent[0]" :key="index" class="d-flex align-items-center">
              <span>{{names[0][key]}} - {{val}} %</span>
              <b-button-group class="ml-4">
                <b-button @click.prevent="setDataOne(key, false, 'percent')">-</b-button>
                <b-button @click.prevent="setDataOne(key, true, 'percent')" variant="success">+</b-button>
                <b-button @click.prevent="setDataOne(key, 'new', 'percent')" variant="info">new</b-button>
              </b-button-group>
            </b-list-group-item>
          </b-list-group>
        </b-tab>
      </b-tabs>
      <b-modal v-model="changeValueModal" title="ChangeValue" centered hide-footer @shown="focusMyElement">
        <b-form action="#" @submit.prevent="changeDataOne">
          <b-form-input type="number" v-model="changeValue" ref="focusThis" step="0.01" />
        </b-form>
      </b-modal>
      <b-alert class="alert" fade :show="dismissCountDown" dismissible @dismissed="onDismissed" :variant="alert.variant">
        {{alert.text}}
      </b-alert>
    </b-container>
    <b-container fluid v-else>
      <h2>Hello world</h2>
      <b-form action="#" @submit.prevent="onLogin">
        <b-form-group label="Email address:" label-for="exampleInput1">
          <b-form-input id="exampleInput1"
          type="email"
          v-model="form.email"
          required
          placeholder="Enter email"></b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="exampleInput2">
          <b-form-input id="exampleInput2"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter password"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="success">Войти</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { db } from '@/main'

export default {
  name: 'App',
  data () {
    return {
      authorized: false,
      percent: [],
      finance: [],
      names: [],
      money: 0,
      financeDoc: 'P0nJ1MFruskYjalwL5Jl',
      percentDoc: 'aQwmNa0nxiXWcKVWpYns',
      changeValue: null,
      activeChangeKey: null,
      activeActions: 'minus',
      activeDocs: 'finance',
      changeValueModal: false,
      dismissSecs: 2,
      dismissCountDown: 0,
      alert: {
        variant: 'success',
        text: 'Успешно'
      },
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    allPercentValue () {
      let all = 0
      Object.keys(this.percent[0]).map(el => {
        all+= +this.percent[0][el]
      })
      return all.toFixed()
    }
  },
  methods: {
    onSubmit () {
      let perc = this.percent[0];
      let factor = this.money / 100;
      let content = {};

      Object.keys(this.finance[0]).map(el => {
        content[el] = this.finance[0][el] + +(perc[el]*factor).toFixed()
        // обнуление для тестов
        // content[el] = 0
      })

      this.setData('finance', this.financeDoc, content)
    },
    changeDataOne () {
      let value = +this.changeValue
      let oldVale = this.activeDocs === 'finance' ? this.finance[0][this.activeChangeKey] : this.percent[0][this.activeChangeKey]
      let contentValue = this.activeActions === 'new' ? value
        : this.activeActions === 'minus' ? oldVale - value
        : oldVale + value
      
      this.activeDocs === 'finance' ? 
      this.setData('finance', this.financeDoc, { [this.activeChangeKey]: contentValue }) : 
      this.setData('percent', this.percentDoc, { [this.activeChangeKey]: contentValue }) 
    },
    setDataOne (key, increase, docs) {
      increase === 'new' ? this.activeActions = 'new' : 
      increase ? this.activeActions = 'pluse' : this.activeActions = 'minus'
      this.activeChangeKey = key
      this.activeDocs = docs

      this.changeValueModal = true
    },
    setData (collect, doc, content) {
      var sfDocRef = db.collection(collect).doc(doc);

      db.runTransaction(function(transaction) {
        return transaction.get(sfDocRef).then(function(sfDoc) {
          if (!sfDoc.exists) {
            throw "Document does not exist!";
          }
          transaction.update(sfDocRef, content);
        });
      }).then(response => {
          this.money = null
          this.changeValue = null
          this.changeValueModal = false
          this.showAlert(true)
      }).catch(function(err) {
          this.showAlert(false)
      });
    },
    focusMyElement () {
      this.$refs.focusThis.focus()
    },
    showAlert (status) {
      if (status) {
        this.alert.variant = 'success'
        this.alert.text = 'Успешно'
      } else {
        this.alert.variant = 'danger'
        this.alert.text = 'Ошибка'
      }
      this.dismissCountDown = this.dismissSecs
    },
    onDismissed () {
      this.dismissCountDown = 0;
    },
    onLogin () {
      firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(user => {
            this.authorized = true
        })
        .catch(() => {
            this.authorized = false
        });
    }
  },
  firestore () {
    return {
      percent: db.collection('percent'),
      finance: db.collection('finance'),
      names: db.collection('names')
    }
  }
}
</script>

<style>
.alert {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;
  z-index: 100;
}
</style>
