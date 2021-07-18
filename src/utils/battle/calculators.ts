import {
  ISkill,
  SkillActionType,
  SkillCondition,
  SkillEffect,
  SkillEffectBasis,
  SkillEffectType,
  SkillOn,
} from "types/skills";
import { BattleCharacter as Character } from "types/battle";
import { CharacterAttribute } from "types/characters";

export const calcAttack = (character: Character) => {
  let ATKEffectPercentage = 0;
  let ATKEffectValue = 0;

  character.effects.forEach((e) => {
    if (e.type === SkillEffectType.ATTACK_POWER && e.value !== undefined) {
      if (e.basis === SkillEffectBasis.SELF_ATK) {
        ATKEffectValue += e.value;
      } else if (e.basis === SkillEffectBasis.TARGET_ATK) {
        const stack = e.stack ? e.stack : 1;
        // check the condition of conditional skill
        if (
          !(
            (e.otherConditionValue &&
              e.otherCondition === SkillCondition.HP_GREATER_THAN &&
              character.HP / character.maxHP < e.otherConditionValue) ||
            (e.otherConditionValue &&
              e.otherCondition === SkillCondition.HP_LESS_THAN &&
              character.HP / character.maxHP >= e.otherConditionValue)
          )
        ) {
          ATKEffectPercentage += e.value * stack * 100;
        }
      }
    }
  });

  return (
    Math.floor(character.baseATK * (1 + ATKEffectPercentage / 100)) +
    ATKEffectValue
  );
};

/**
 * A chart describing the damage rate among attributes
 * rate = ATTRIBUTE_CHART[from][to]
 */
const ATTRIBUTE_CHART = [
  [1, 0.75, 1.5, 1, 1],
  [1.5, 1, 0.75, 1, 1],
  [0.75, 1.5, 1, 1, 1],
  [1, 1, 1, 1, 1.5],
  [1, 1, 1, 1.5, 1],
];

export const calcDamage = (
  from: Character,
  to: Character,
  action: ISkill | SkillEffect
) => {
  if (
    !action.value ||
    !(
      action.type === SkillActionType.COUNTER_STRIKE ||
      action.type === SkillActionType.NORMAL_ATTACK ||
      action.type === SkillActionType.ULTIMATE ||
      action.type === SkillActionType.FOLLOW_UP_ATTACK ||
      action.type === SkillActionType.REAL_ATTACK
    )
  ) {
    throw "invalid argument: wrong skill type";
  }

  let dealtDamageEffect = 1;
  let attackDamageEffect = 1;
  let attributeEffect =
    from.attribute === CharacterAttribute.NONE ||
    to.attribute === CharacterAttribute.NONE ||
    action.on === SkillOn.TURN_END ||
    action.type === SkillActionType.REAL_ATTACK
      ? 1
      : ATTRIBUTE_CHART[from.attribute][to.attribute];
  let guardEffect = to.isGuard ? 0.5 : 1;
  let breakEffect = to.isBroken ? 1.25 : 1;
  let damagedEffect = 1;
  let attributeDamagedEffect = 1;

  if (action.basis === SkillEffectBasis.TARGET_CURRENT_HP) {
    return Math.floor(to.HP * action.value);
  }

  if (action.basis === SkillEffectBasis.TARGET_MAX_HP) {
    return Math.floor(to.maxHP * action.value);
  }

  from.effects.forEach((e) => {
    // exclude dot
    if (
      action.on === SkillOn.TURN_END ||
      action.type === SkillActionType.REAL_ATTACK ||
      e.value === undefined
    ) {
      return true;
    }

    if (
      (e.otherConditionValue &&
        e.otherCondition === SkillCondition.HP_GREATER_THAN &&
        from.HP / from.maxHP < e.otherConditionValue) ||
      (e.otherConditionValue &&
        e.otherCondition === SkillCondition.HP_LESS_THAN &&
        from.HP / from.maxHP >= e.otherConditionValue)
    ) {
      return true;
    }

    const stack = e.stack ? e.stack : 1;

    switch (e.type) {
      case SkillEffectType.ATTRIBUTE_EFFECT:
        attributeEffect = 1 + (attributeEffect - 1) * (1 + e.value * stack);
        break;
      case SkillEffectType.DEALT_DAMAGE:
        dealtDamageEffect += e.value * stack;
        break;
      case SkillEffectType.NORMAL_ATTACK_DAMAGE:
        if (action.type === SkillActionType.NORMAL_ATTACK) {
          attackDamageEffect += e.value * stack;
        }
        break;
      case SkillEffectType.ULTIMATE_DAMAGE:
        if (
          action.type === SkillActionType.ULTIMATE ||
          action.type === SkillActionType.FOLLOW_UP_ATTACK
        ) {
          attackDamageEffect += e.value * stack;
        }
        break;
    }

    return true;
  });

  to.effects.forEach((e) => {
    if (e.value === undefined || action.type === SkillActionType.REAL_ATTACK) {
      return true;
    }

    if (
      (e.otherConditionValue &&
        e.otherCondition === SkillCondition.HP_GREATER_THAN &&
        from.HP / from.maxHP < e.otherConditionValue) ||
      (e.otherConditionValue &&
        e.otherCondition === SkillCondition.HP_LESS_THAN &&
        from.HP / from.maxHP >= e.otherConditionValue)
    ) {
      return true;
    }
    const stack = e.stack ? e.stack : 1;

    switch (e.type) {
      case SkillEffectType.ATTRIBUTE_DAMAGED:
        if (
          action.on !== SkillOn.TURN_END &&
          e.byAttribute === from.attribute
        ) {
          attributeDamagedEffect += e.value * stack;
        }
        break;
      case SkillEffectType.ATTRIBUTE_EFFECT:
        if (action.on !== SkillOn.TURN_END) {
          attributeEffect = 1 + (attributeEffect - 1) * (1 + e.value * stack);
        }
        break;
      case SkillEffectType.DAMAGED:
        damagedEffect += e.value * stack;
        break;
      case SkillEffectType.NORMAL_ATTACK_DAMAGED:
        if (
          action.on !== SkillOn.TURN_END &&
          action.type === SkillActionType.NORMAL_ATTACK
        ) {
          attackDamageEffect += e.value * stack;
        }
        break;
      case SkillEffectType.ULTIMATE_DAMAGED:
        if (
          action.on !== SkillOn.TURN_END &&
          (action.type === SkillActionType.ULTIMATE ||
            action.type === SkillActionType.FOLLOW_UP_ATTACK)
        ) {
          attackDamageEffect += e.value * stack;
        }
        break;
      case SkillEffectType.GUARD_EFFECT:
        if (to.isGuard) {
          guardEffect -= e.value * stack;
        }
        break;
    }

    return true;
  });

  return Math.floor(
    (action.on === SkillOn.TURN_END &&
    action.basis === SkillEffectBasis.SELF_ATK
      ? 1
      : from.ATK) *
      dealtDamageEffect *
      attackDamageEffect *
      attributeEffect *
      guardEffect *
      breakEffect *
      damagedEffect *
      attributeDamagedEffect *
      action.value
  );
};

export const calcHeal = (
  from: Character,
  to: Character,
  action: ISkill | SkillEffect,
  damage?: number
) => {
  if (!action.value || action.type !== SkillActionType.HEAL) {
    throw "invalid argument";
  }

  let base: number;
  let healEffect = 1;
  let healedEffect = 1;
  let damageEffect = 1;

  if (action.on === SkillOn.TURN_END) {
    base = 1;
  } else {
    switch (action.basis) {
      case SkillEffectBasis.SELF_ATK:
        base = from.ATK;
        break;
      case SkillEffectBasis.TARGET_ATK:
        base = to.ATK;
        break;
      case SkillEffectBasis.TARGET_MAX_HP:
        base = to.maxHP;
        break;
      case SkillEffectBasis.TARGET_CURRENT_HP:
        base = to.HP;
        break;
      case SkillEffectBasis.DAMAGE:
        if (damage === undefined) {
          throw "invalid argument";
        }

        return Math.floor(damage * action.value);
      default:
        throw "invalid argument";
    }
  }

  from.effects.forEach((e): boolean | void => {
    if (action.on === SkillOn.TURN_END || e.value === undefined) {
      return true;
    }

    const stack = e.stack ? e.stack : 1;

    switch (e.type) {
      case SkillEffectType.HEAL_EFFECT:
        healEffect += e.value * stack;
        break;
      case SkillEffectType.NORMAL_ATTACK_DAMAGE:
        if (action.condition === SkillCondition.NORMAL_ATTACK) {
          damageEffect += e.value * stack;
        }
        break;
      case SkillEffectType.ULTIMATE_DAMAGE:
        if (action.condition === SkillCondition.ULTIMATE) {
          damageEffect += e.value * stack;
        }
        break;
    }
  });

  to.effects.forEach((e) => {
    if (e.value !== undefined && e.type === SkillEffectType.HEALED) {
      const stack = e.stack ? e.stack : 1;
      healedEffect += e.value * stack;
    }
  });

  return Math.floor(
    base * healEffect * healedEffect * damageEffect * action.value
  );
};

export const calcShield = (
  from: Character,
  to: Character,
  action: ISkill | SkillEffect
) => {
  if (!action.value || action.type !== SkillActionType.SHIELD) {
    throw "invalid argument";
  }

  let base: number;
  let shieldEffect = 1;
  let shieldedEffect = 1;
  let damageEffect = 1;

  switch (action.basis) {
    case SkillEffectBasis.SELF_ATK:
      base = from.ATK;
      break;
    case SkillEffectBasis.TARGET_ATK:
      base = to.ATK;
      break;
    case SkillEffectBasis.TARGET_MAX_HP:
      base = to.maxHP;
      break;
    default:
      throw "invalid argument";
  }

  from.effects.forEach((e) => {
    if (e.value !== undefined) {
      const stack = e.stack ? e.stack : 1;

      switch (e.type) {
        case SkillEffectType.SHIELD_EFFECT:
          shieldEffect += e.value * stack;
          break;
        case SkillEffectType.NORMAL_ATTACK_DAMAGE:
          if (action.condition === SkillCondition.NORMAL_ATTACK) {
            damageEffect += e.value * stack;
          }
          break;
        case SkillEffectType.ULTIMATE_DAMAGE:
          if (action.condition === SkillCondition.ULTIMATE) {
            damageEffect += e.value * stack;
          }
          break;
      }
    }
  });

  to.effects.forEach((e) => {
    if (e.value !== undefined && e.type === SkillEffectType.SHIELDED) {
      const stack = e.stack ? e.stack : 1;
      shieldedEffect += e.value * stack;
    }
  });

  return Math.floor(
    base * shieldEffect * shieldedEffect * damageEffect * action.value
  );
};
