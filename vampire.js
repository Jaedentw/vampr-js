class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVamps = 0;
    let currentVamp = this;

    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numberOfVamps++;
    }

    return numberOfVamps;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const vampLine1 = vampire.numberOfVampiresFromOriginal;
    const vampLine2 = this.numberOfVampiresFromOriginal
    if(vampLine1 >= vampLine2) {
      return true;
    } else {
      return false;
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let foundVampire = null;
    if(this.name === name) {
      return this;
    }
    for (const vamp of this.offspring) {
      if(vamp.name === name) {
        return vamp;
      }
      foundVampire = vamp.vampireWithName(name);
      if(foundVampire !== null) {
        return foundVampire;
      }
    }
    return foundVampire;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;
    if(this.offspring) {
      count += this.offspring.length
      for(const vamp of this.offspring) {
        if (vamp.offspring) {
          count += vamp.totalDescendents;
        }
      }
    }
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennials = [];
    
    if(this.offspring) {
      for(const vamp of this.offspring) {
        if(vamp.yearConverted > 1980) {
          millennials.push(vamp);
        }
        if(vamp.offspring) {
          const mills = vamp.allMillennialVampires;
          for(const mill of mills) {
            millennials.push(mill);
          }
        }
      }
    }
    return millennials;
  }
  
}

module.exports = Vampire;