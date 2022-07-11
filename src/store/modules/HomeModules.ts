/* eslint-disable prefer-const */
// eslint-disable-next-line @typescript-eslint/ban-types
let HomeModule: Object = {
  state: {
    navBool: false,
    dialogFormVisible: false,
  },
  mutations: {
    SET_NAV_BOOL(state: any) {
      state.navBool = !state.navBool;
    },
    SET_DIALOG(state: any) {
      state.dialogFormVisible = true;
    },
  },
  actions: {},
  getters: {},
};
export default HomeModule;
