// @flow

import type { Byte, Address } from './Types';

// From nocash-s pandocs
//
// 0000-3FFF   16KB ROM Bank 00     (in cartridge, fixed at bank 00)
// 4000-7FFF   16KB ROM Bank 01..NN (in cartridge, switchable bank number)
// 8000-9FFF   8KB Video RAM (VRAM) (switchable bank 0-1 in CGB Mode)
// A000-BFFF   8KB External RAM     (in cartridge, switchable bank, if any)
// C000-CFFF   4KB Work RAM Bank 0 (WRAM)
// D000-DFFF   4KB Work RAM Bank 1 (WRAM)  (switchable bank 1-7 in CGB Mode)
// E000-FDFF   Same as C000-DDFF (ECHO)    (typically not used)
// FE00-FE9F   Sprite Attribute Table (OAM)
// FEA0-FEFF   Not Usable
// FF00-FF7F   I/O Ports
// FF80-FFFE   High RAM (HRAM)
// FFFF        Interrupt Enable Register

const ADDR_MAX: Address = 0xFFFF;

const ADDR_ROM_LOW: Address = 0x0000;
const ADDR_ROM_HIGH: Address = 0x8000;

type AddressRange =
  'invalid' | 'rom' | 'vram' | 'sram' | 'wram' |
  'echo_wram' | 'oam' | 'io' | 'hram' | 'unknown';

class MMU {
  memory: Uint8Array;

  constructor() {
    // TODO: create properties for all kinds memories.
    this.memory = new Uint8Array(ADDR_MAX);
  }

  readByte(address: Address): Byte {
    if (!isValidAddress(address)) {
      // TODO: log error
      return 0;
    }

    // TODO: read from the right sources for different address ranges.

    return this.memory[address];
  }

  writeByte(address: Address, data: Byte): Byte {
    if (!isValidAddress(address)) {
      // TODO: log error
      return 0;
    }

    // TODO: write to the right destinations for different address ranges.

    this.memory[address] = data;
    return data;
  }
}

function isValidAddress(address: Address): boolean {
  return !!(Number.isInteger(address) && address >= 0 && address <= ADDR_MAX);
}

function isWithInRange(address: Address, low: Address, high: Address): boolean {
  return address >= low && address <= high;
}

function addressRange(address: Address): AddressRange {
  if (!isValidAddress(address)) {
    return 'invalid';
  }

  if (isWithInRange(address, ADDR_ROM_LOW, ADDR_ROM_HIGH)) {
    return 'rom';
  }

  // TODO: recognize other ranges.

  return 'unknown';
}



export default MMU;
