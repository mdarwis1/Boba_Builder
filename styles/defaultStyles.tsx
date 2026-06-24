import { StyleSheet } from "react-native";
import colors from "./colors";

const defaultStyles = StyleSheet.create({
  // login
  loginScroll: {
    paddingBottom: 150,
    flexGrow: 1,
    justifyContent: "center",
  },
  loginContainer: {
    backgroundColor: colors.backgroundMain,
  },

  // general container and text
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundMain,
    padding: 30,
  },

  text: {
    fontSize: 35,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.mainText,
    fontFamily: "Fredoka_700Bold",
  },

  // textfield component
  textInputBox: {
    width: 250,
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
    borderColor: colors.accents,
    fontFamily: "Fredoka_400Regular",
  },

  // button component
  button: {
    height: 50,
    width: 100,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.accents,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    color: colors.componentLight,
    fontFamily: "Fredoka_400Regular",
  },

  // slider
  sliderContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  sliderLabel: {
    fontSize: 20,
    color: colors.mainText,
    fontFamily: "Fredoka_500Medium",
  },
  slider: {
    width: 200,
    height: 40,
  },

  // dropdown
  dropdown: {
    backgroundColor: colors.componentLight,
    borderColor: colors.accents,
    borderWidth: 2,
    borderRadius: 8,
    marginVertical: 8,
  },
  dropdownContainer: {
    borderColor: colors.componentLight,
  },

  // radio buttons
  radioButton: {
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 50,
    margin: 5,
    color: colors.accents,
  },
  radioContainer: {
    borderWidth: 2,
    borderRadius: 12,
    margin: 25,
    padding: 6,
    backgroundColor: colors.componentLight,
    borderColor: colors.accents,
  },

  // FlatList
  list: {
    marginTop: 20,
    width: "100%",
    color: colors.componentDark,
  },
  listEmptyComponent: {
    textAlign: "center",
    marginTop: 24,
    color: colors.componentDark,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: colors.componentDark,
    marginLeft: 14,
    marginRight: 14,
  },
  // favorites screen
  iconButton: {
    borderWidth: 2,
    borderRadius: 70,
  },
  icon: {
    flexDirection: "row",
    padding: 8,
    margin: 2,
  },
  renameBox: {
    borderWidth: 1,
    borderColor: colors.accents,
    padding: 5,
    width: 150,
    marginRight: 10,
  },

  favoriteItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.componentDark,
    padding: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  favoritesListImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  // modal
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.mainText,
    fontFamily: "Fredoka_700Bold",
    textAlign: "center",
  },
  modalQty: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  ingredientsContainer: {
    margin: 10,
  },
  drinkDetailText: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  ingredientText: {
    marginBottom: 4,
  },

  // checkout screen
  subtotalContainer: {
    padding: 16,
  },
  tipScreenContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  tipText: {
    fontSize: 18,
    marginBottom: 2,
    color: colors.mainText,
    fontFamily: "Fredoka_500Medium",
  },
  newTotalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.mainText,
    fontFamily: "Fredoka_500Medium",
  },

  builderImageContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  builderImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  // card component
  card: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: colors.accents,
    fontFamily: "Fredoka_700Bold",
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.componentDark,
    marginBottom: 8,
    fontFamily: "Fredoka_500Medium",
  },
  cardText: {
    fontSize: 16,
    color: colors.componentDark,
    fontFamily: "Fredoka_500Medium",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cartItemName: {
    fontSize: 16,
    fontFamily: "Fredoka_500Medium",
    color: colors.accents,
  },

  cartItemDetails: {
    fontSize: 14,
    color: colors.accents,
    fontFamily: "Fredoka_400Regular",
    marginTop: 2,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default defaultStyles;
