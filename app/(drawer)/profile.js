import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, } from "react-native"; // use one line for this
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);

  // Name states
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userNameField, setUserNameField] = useState("");

  // Combined username for profile display
  const [username, setUsername] = useState("");

  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Temporary states for unsaved edits
  const [tempImage, setTempImage] = useState(null);
  const [tempBackgroundImage, setTempBackgroundImage] = useState(null);

  const formattedDate = birthday.toLocaleDateString("en-US");

  // Pick temporary profile image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setTempImage({ uri: result.assets[0].uri });
    }
  };

  // Pick temporary background image
  const pickBackgroundImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setTempBackgroundImage({ uri: result.assets[0].uri });
    }
  };

  // Save changes
  const handleSave = () => {
    const displayName =
      userNameField || [firstName, middleName, lastName].filter(Boolean).join(" ");
    setUsername(displayName);

    // Apply temp images
    setImage(tempImage);
    setBackgroundImage(tempBackgroundImage);

    setModalVisible(false);
  };

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setBirthday(selectedDate);
    }
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Profile" showSearch={false} />

      <View style={styles.profileSection}>
        {backgroundImage ? (
          <Image source={backgroundImage} style={styles.backgroundImage} />
        ) : (
          <Image
            source={require("../../assets/pic1.jpg")}
            style={styles.backgroundImage}
          />
        )}

        <View style={styles.avatarContainer}>
          {image ? (
            <Image source={image} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.placeholderCircle]}>
              <Icon name="user" size={50} color="#999" />
            </View>
          )}
        </View>

        <Text style={styles.name}>{username || "Username"}</Text>
        <Text style={styles.detail}>Sex: {gender}</Text>
        <Text style={styles.detail}>Birthday: {formattedDate}</Text>
        <Text style={styles.detail}>Address: {address}</Text>
        <Text style={styles.detail}>Bio: {bio}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // copy current profile data into temp states before editing
              setTempImage(image);
              setTempBackgroundImage(backgroundImage);
              setModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.aboutBox}>
        <Text style={styles.aboutText}>{about}</Text>
      </View>

      <Text style={styles.sectionTitle}>Artwork Galleries</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.galleryRow}
      >
        {[
          require("../../assets/pic1.jpg"),
          require("../../assets/pic1.jpg"),
          require("../../assets/pic1.jpg"),
        ].map((img, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedImage(img)}>
            <Image source={img} style={styles.galleryItem} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Full screen modal for image */}
      <Modal
        visible={selectedImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <TouchableOpacity
          style={styles.fullScreenContainer}
          onPress={() => setSelectedImage(null)}
          activeOpacity={1}
        >
          <Image
            source={selectedImage}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.keyboardView}
            >
              <ScrollView
                contentContainerStyle={styles.modalBox}
                keyboardShouldPersistTaps="handled"
              >
                <Text style={styles.modalTitle}>Edit Profile</Text>

                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                  {tempImage ? (
                    <Image source={tempImage} style={styles.avatarEdit} />
                  ) : (
                    <View style={[styles.avatarEdit, styles.placeholderCircle]}>
                      <Icon name="user" size={40} color="#999" />
                    </View>
                  )}
                  <Text style={styles.changePhotoText}>Change Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={pickBackgroundImage}
                  style={styles.imagePicker}
                >
                  <View style={styles.backgroundPreviewContainer}>
                    {tempBackgroundImage ? (
                      <Image
                        source={{ uri: tempBackgroundImage.uri }}
                        style={styles.backgroundPreviewImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View
                        style={[
                          styles.backgroundPreviewImage,
                          styles.placeholderCircle,
                        ]}
                      >
                        <Icon name="image" size={40} color="#999" />
                      </View>
                    )}
                  </View>
                  <Text style={styles.changePhotoText}>
                    Change Background Photo
                  </Text>
                </TouchableOpacity>

                {/* Name Inputs */}
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#999"
                  value={firstName}
                  onChangeText={setFirstName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Middle Name"
                  placeholderTextColor="#999"
                  value={middleName}
                  onChangeText={setMiddleName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#999"
                  value={lastName}
                  onChangeText={setLastName}
                />

                {/* Username Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#999"
                  value={userNameField}
                  onChangeText={setUserNameField}
                />

                {/* Gender Dropdown */}
                <View style={styles.inputContainer}>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowGenderDropdown(!showGenderDropdown)}
                    activeOpacity={0.8}
                  >
                    <Text style={{ color: gender ? "#000" : "#999" }}>
                      {gender || "Select Sex"}
                    </Text>
                    <Icon
                      name={showGenderDropdown ? "angle-up" : "angle-down"}
                      size={20}
                      color="#555"
                      style={{ position: "absolute", right: 10, top: 12 }}
                    />
                  </TouchableOpacity>

                  {showGenderDropdown && (
                    <View style={styles.dropdownList}>
                      {["Male", "Female", "Others"].map((item) => (
                        <TouchableOpacity
                          key={item}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setGender(item);
                            setShowGenderDropdown(false);
                          }}
                        >
                          <Text style={styles.dropdownItemText}>{item}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* Date Picker */}
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={{ color: birthday ? "#000" : "#888" }}>
                    {birthday
                      ? `Birthday: ${formattedDate}`
                      : "Select your birthday"}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={birthday}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                  />
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Enter your address"
                  placeholderTextColor="#999"
                  value={address}
                  onChangeText={setAddress}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your bio"
                  placeholderTextColor="#999"
                  value={bio}
                  onChangeText={setBio}
                />
                <TextInput
                  style={[styles.input, { height: 80 }]}
                  placeholder="Write something about yourself"
                  placeholderTextColor="#999"
                  multiline
                  value={about}
                  onChangeText={setAbout}
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  profileSection: {
    alignItems: "center",
    marginTop: 10,
    padding: 0,
  },
  backgroundImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: "cover",
    marginBottom: -50,
  },
  avatarContainer: {
    position: "relative",
    top: -50,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  name: { fontSize: 20, fontWeight: "bold", marginTop: -30 },
  detail: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginVertical: 2,
  },
  buttonRow: { flexDirection: "row", marginTop: 10 },
  button: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  buttonText: { fontSize: 14, fontWeight: "600" },
  aboutBox: {
    backgroundColor: "#f2f2f2",
    margin: 15,
    padding: 15,
    borderRadius: 10,
  },
  aboutText: { fontSize: 14, color: "black", textAlign: "center" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 10,
  },
  galleryRow: { flexDirection: "row", margin: 10 },
  galleryItem: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  keyboardView: { flex: 1, width: "100%" },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },
  imagePicker: { alignItems: "center", marginVertical: 10 },
  avatarEdit: { width: 90, height: 90, borderRadius: 45 },
  changePhotoText: {
    textAlign: "center",
    color: "#007BFF",
    marginTop: 5,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    position: "relative",
  },
  dropdownList: {
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginTop: -5,
    elevation: 3,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#000",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
  cancelButton: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  cancelButtonText: { color: "black", fontWeight: "bold" },
  placeholderCircle: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  backgroundPreviewContainer: {
    width: 300,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  backgroundPreviewImage: {
    width: "100%",
    height: "100%",
  },
});


