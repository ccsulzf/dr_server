/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50722
Source Host           : localhost:3306
Source Database       : dr-test

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2019-06-05 18:02:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for transfer
-- ----------------------------
DROP TABLE IF EXISTS `transfer`;
CREATE TABLE `transfer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `transferDate` varchar(20) NOT NULL,
  `outFundAccountId` int(11) DEFAULT NULL,
  `inFundAccountId` int(11) NOT NULL,
  `isHandle` tinyint(4) NOT NULL,
  `handleFee` float(11,2) DEFAULT NULL,
  `amount` float(11,2) NOT NULL,
  `memo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of transfer
-- ----------------------------
INSERT INTO `transfer` VALUES ('3', '1', '2019-06-05', '22', '24', '0', '0.00', '1000.00', '', '2019-06-05 17:18:45', '2019-06-05 17:18:45', null);

-- ----------------------------
-- Table structure for TransferLabel
-- ----------------------------
DROP TABLE IF EXISTS `TransferLabel`;
CREATE TABLE `TransferLabel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `labelId` int(11) NOT NULL,
  `transferId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of TransferLabel
-- ----------------------------
