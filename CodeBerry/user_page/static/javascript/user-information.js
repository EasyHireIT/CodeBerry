class UserInformationSelect {
  constructor(classNameToFind, classNameToAdd) {
    this.originalSelects = document.querySelectorAll(classNameToFind);
    this.originalSelects.forEach((originalSelect) => {
      this.originalSelect = originalSelect;
      this.userInformationSelect = document.createElement("div");
      this.userInformationSelect.classList.add(classNameToAdd);

      this.originalSelect.querySelectorAll("option").forEach((optionElement) => {
        const itemElement = document.createElement("div");

        itemElement.classList.add("select__item");
        itemElement.textContent = optionElement.textContent;
        this.userInformationSelect.appendChild(itemElement);

        if (optionElement.selected) {
          this._select(itemElement);
        }

        itemElement.addEventListener("click", () => {
          if (this.originalSelect.multiple &&
              itemElement.classList.contains("select__item--selected")
          ) {
            this._deselect(itemElement);
          } else {
            this._select(itemElement);
          }
        });
      });

      this.originalSelect.insertAdjacentElement("afterend", this.userInformationSelect);
      this.originalSelect.style.display = "none";
    });
  }

  _select(itemElement) {
    const index = Array.from(this.userInformationSelect.children).indexOf(itemElement);

    if (!this.originalSelect.multiple) {
      this.userInformationSelect.querySelectorAll(".select__item").forEach((el) => {
        el.classList.remove("select__item--selected");
      });
    }

    this.originalSelect.querySelectorAll("option")[index].selected = true;
    itemElement.classList.add("select__item--selected");
  }

  _deselect(itemElement) {
    const index = Array.from(this.userInformationSelect.children).indexOf(itemElement);

    this.originalSelect.querySelectorAll("option")[index].selected = false;
    itemElement.classList.remove("select__item--selected");
  }
}
