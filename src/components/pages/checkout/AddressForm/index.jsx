import styles from './index.module.scss';

const nameStyles = {
  label:
    userInput.name.length > 0 ? styles.label_focus : styles.label_no_focus,
  input:
    userInput.name.length > 0 ? styles.input_focus : styles.input_no_focus,
};

const lastNameStyles = {
  label:
    userInput.lastName.length > 0
      ? styles.label_focus
      : styles.label_no_focus,
  input:
    userInput.lastName.length > 0
      ? styles.input_focus
      : styles.input_no_focus,
};

const addressStyles = {
  label:
    userInput.address.length > 0 ? styles.label_focus : styles.label_no_focus,
  input:
    userInput.address.length > 0 ? styles.input_focus : styles.input_no_focus,
};

const cityStyles = {
  label:
    userInput.city.length > 0 ? styles.label_focus : styles.label_no_focus,
  input:
    userInput.city.length > 0 ? styles.input_focus : styles.input_no_focus,
};

const stateStyles = {
  label:
    userInput.state.length > 0 ? styles.label_focus : styles.label_no_focus,
  input:
    userInput.state.length > 0 ? styles.input_focus : styles.input_no_focus,
};

const zipCodeStyles = {
  label:
    userInput.zipCode.length > 0 ? styles.label_focus : styles.label_no_focus,
  input:
    userInput.zipCode.length > 0 ? styles.input_focus : styles.input_no_focus,
};

const phoneNumberStyles = {
  label:
    userInput.phoneNumber.length > 0
      ? styles.label_focus
      : styles.label_no_focus,
  input:
    userInput.phoneNumber.length > 0
      ? styles.input_focus
      : styles.input_no_focus,
};

const AddressForm = () => {
  return (
    <>
      <Dropdown
        styles={reactSelectStyles}
        options={options}
        isSearchable={false}
        onChange={handleSelectAddress}
        defaultValue={defaultOption}
      />
      <div className={styles.name_wrapper}>
        <div
          className={`${styles.float_container} ${
            isDisabled ? styles.disabled : ''
          }`}
        >
          <label htmlFor="name" className={nameStyles.label}>
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="off"
            onChange={handleNameInput}
            value={userInput.name}
            className={nameStyles.input}
            required
            placeholder="Name"
            disabled={isDisabled}
          />
        </div>
        <div
          className={`${styles.float_container} ${
            isDisabled ? styles.disabled : ''
          }`}
        >
          <label htmlFor="lastName" className={lastNameStyles.label}>
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            autoComplete="off"
            onChange={handleLastNameInput}
            value={userInput.lastName}
            className={lastNameStyles.input}
            required
            placeholder="Last Name"
            disabled={isDisabled}
          />
        </div>
      </div>
      <div
        className={`${styles.float_container} ${
          isDisabled ? styles.disabled : ''
        }`}
      >
        <label htmlFor="address" className={addressStyles.label}>
          Address
        </label>
        <input
          id="address"
          type="text"
          autoComplete="off"
          onChange={handleAddressInput}
          value={userInput.address}
          className={addressStyles.input}
          required
          placeholder="Address"
          disabled={isDisabled}
        />
      </div>
      <div className={styles.zip_wrapper}>
        <div
          className={`${styles.float_container} ${
            isDisabled ? styles.disabled : ''
          }`}
        >
          <label htmlFor="city" className={cityStyles.label}>
            City
          </label>
          <input
            id="city"
            type="text"
            autoComplete="off"
            onChange={handleCityInput}
            value={userInput.city}
            className={cityStyles.input}
            required
            placeholder="City"
            disabled={isDisabled}
          />
        </div>
        <div
          className={`${styles.float_container} ${
            isDisabled ? styles.disabled : ''
          }`}
        >
          <label htmlFor="zipCode" className={zipCodeStyles.label}>
            Zip Code
          </label>
          <input
            id="zipCode"
            type="text"
            autoComplete="off"
            onChange={handleZipCodeInput}
            value={userInput.zipCode}
            className={zipCodeStyles.input}
            required
            placeholder="Zip Code"
            disabled={isDisabled}
          />
        </div>
        <div
          className={`${styles.float_container} ${
            isDisabled ? styles.disabled : ''
          }`}
        >
          <label htmlFor="state" className={stateStyles.label}>
            State
          </label>
          <input
            id="state"
            type="text"
            autoComplete="off"
            onChange={handleStateInput}
            value={userInput.state}
            className={stateStyles.input}
            required
            placeholder="State"
            disabled={isDisabled}
          />
        </div>
      </div>
      <div
        className={`${styles.float_container} ${
          isDisabled ? styles.disabled : ''
        }`}
      >
        <label htmlFor="phoneNumber" className={phoneNumberStyles.label}>
          Phone
        </label>
        <input
          id="phoneNumber"
          type="tel"
          autoComplete="off"
          onChange={handlePhoneNumberInput}
          value={userInput.phoneNumber}
          className={phoneNumberStyles.input}
          required
          placeholder="Phone"
          disabled={isDisabled}
        />
      </div>
    </>
  );
};

export default AddressForm;
